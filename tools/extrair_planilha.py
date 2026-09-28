#!/usr/bin/env python3
"""
Extrator de dados de planilha Excel (.xlsx) para formato JSON.

Este script lê um arquivo .xlsx tratando-o como um ZIP, sem usar
bibliotecas externas. Extrai dados de exercícios e configurações de
sessões de treino da planilha 'Meso 3x'.

Saída:
- src/data/exercicios.json: Catálogo de exercícios organizados por grupo
- src/engine/__fixtures__/meso3x.json: Dados estruturados para testes
"""

import zipfile
import re
import html
import json
import argparse
import unicodedata
from datetime import datetime, timedelta
from pathlib import Path

def normalize_slug(text):
    """Convert text to URL-friendly slug."""
    if not text:
        return ""
    # Remove accents using NFKD normalization
    text = unicodedata.normalize('NFKD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    # Convert to lowercase
    text = text.lower()
    # Replace non-alphanumerics with dashes
    text = re.sub(r'[^a-z0-9]+', '-', text)
    # Trim dashes
    text = text.strip('-')
    return text

def load_shared_strings(xlsx_path):
    """Load shared strings from xl/sharedStrings.xml."""
    strings = []
    try:
        with zipfile.ZipFile(xlsx_path, 'r') as z:
            content = z.read('xl/sharedStrings.xml').decode('utf-8')
    except Exception:
        return strings

    # Parse <si> elements and concatenate <t> texts
    si_pattern = r'<si>(.*?)</si>'
    for si_match in re.finditer(si_pattern, content, re.DOTALL):
        si_content = si_match.group(1)
        # Extract all <t>...</t> texts
        t_pattern = r'<t[^>]*?>(.*?)</t>'
        texts = re.findall(t_pattern, si_content, re.DOTALL)
        full_text = ''.join(texts)
        full_text = html.unescape(full_text)
        strings.append(full_text)

    return strings

def load_sheet(xlsx_path, sheet_name):
    """Load worksheet content."""
    with zipfile.ZipFile(xlsx_path, 'r') as z:
        # "Meso 3x" is sheet5.xml
        if sheet_name == "Meso 3x":
            sheet_file = 'xl/worksheets/sheet5.xml'
        else:
            # Try to find the sheet
            try:
                # Read workbook.xml to find sheet mapping
                workbook = z.read('xl/workbook.xml').decode('utf-8')
                # Look for the sheet
                pattern = f'name="{re.escape(sheet_name)}"[^>]*?r:id="([^"]+)"'
                match = re.search(pattern, workbook)
                if match:
                    rel_id = match.group(1)
                    # Read workbook.xml.rels
                    rels = z.read('xl/_rels/workbook.xml.rels').decode('utf-8')
                    rel_pattern = f'Id="{re.escape(rel_id)}"[^>]*?Target="([^"]+)"'
                    rel_match = re.search(rel_pattern, rels)
                    if rel_match:
                        sheet_file = 'xl/' + rel_match.group(1)
                    else:
                        return ""
                else:
                    return ""
            except Exception:
                return ""

        try:
            content = z.read(sheet_file).decode('utf-8')
            return content
        except Exception:
            return ""

def parse_cells(sheet_content, shared_strings):
    """Parse cells from sheet content using regex pattern."""
    cells = {}
    pattern = r'<c r="([A-Z]+)(\d+)"([^>]*?)(?:/>|>(.*?)</c>)'

    for match in re.finditer(pattern, sheet_content, re.DOTALL):
        col_letters = match.group(1)
        row_num = int(match.group(2))
        attrs = match.group(3)
        cell_content = match.group(4) or ""

        # Convert column letters to number
        col_num = 0
        for char in col_letters:
            col_num = col_num * 26 + (ord(char) - ord('A') + 1)

        # Parse attributes
        is_string = 't="s"' in attrs
        is_str = 't="str"' in attrs

        # Extract value
        value = None
        v_match = re.search(r'<v>(.*?)</v>', cell_content, re.DOTALL)
        if v_match:
            v_text = v_match.group(1).strip()
            if v_text:
                if is_string:
                    # It's an index into shared strings
                    try:
                        idx = int(v_text)
                        if idx < len(shared_strings):
                            value = shared_strings[idx]
                    except Exception:
                        pass
                elif is_str:
                    value = v_text
                else:
                    # Try to parse as number
                    try:
                        if '.' in v_text:
                            value = float(v_text)
                        else:
                            value = int(v_text)
                    except Exception:
                        value = v_text

        cells[(col_num, row_num)] = value

    return cells

def col_letters_to_num(col_letters):
    """Convert column letters to number."""
    col_num = 0
    for char in col_letters:
        col_num = col_num * 26 + (ord(char) - ord('A') + 1)
    return col_num

def excel_serial_to_date(serial):
    """Convert Excel serial date to ISO date string."""
    if serial is None:
        return None
    try:
        # Excel epoch is 1899-12-30
        epoch = datetime(1899, 12, 30)
        date = epoch + timedelta(days=int(serial))
        return date.isoformat()
    except Exception:
        return None

def extract_exercicios(cells):
    """Extract exercises from column AB (column 28)."""
    col_ab = 28  # AB column

    groups = {}
    seen_names = set()

    # Define valid group headers
    valid_groups = [
        "Quadríceps e Glúteos",
        "Posterior de Coxa",
        "Adutores e Abdutores",
        "Peitorais",
        "Dorsais",
        "Panturrilha",
        "Abdome e Lombar",
        "Ombros",
        "Antebraço",
        "Bíceps",
        "Tríceps",
        "Power Exercises"
    ]
    valid_groups_set = set(valid_groups)

    current_group = None

    row = 2
    while row <= 1000:  # Scan a reasonable range
        value = cells.get((col_ab, row))
        if value is None:
            row += 1
            continue

        value = str(value).strip()
        if not value:
            row += 1
            continue

        if value in valid_groups_set:
            current_group = value
            if current_group not in groups:
                groups[current_group] = []
        else:
            # It's an exercise
            if current_group is None:
                # Skip exercises before any group header
                row += 1
                continue

            # Skip if we've seen this name before (keep first)
            if value not in seen_names:
                slug = normalize_slug(value)
                groups[current_group].append({
                    "id": slug,
                    "nome": value
                })
                seen_names.add(value)

        row += 1

    # Build output maintaining sheet order
    result = []
    for group in valid_groups:
        if group in groups:
            result.append({
                "grupo": group,
                "exercicios": groups[group]
            })

    return result

def extract_meso3x_config(cells):
    """Extract Meso 3x configuration."""
    col_az = col_letters_to_num("AZ")
    col_z = col_letters_to_num("Z")

    config = {
        "semanas": cells.get((col_az, 3)),
        "frequencia": cells.get((col_az, 5)),
        "pausaS": cells.get((col_z, 33)),
        "inicio": excel_serial_to_date(cells.get((col_az, 4)))
    }

    return config

def extract_divisao(cells):
    """Extract training division (treino 1,2,3 for columns T,U,V)."""
    cols = {
        1: col_letters_to_num("T"),
        2: col_letters_to_num("U"),
        3: col_letters_to_num("V")
    }

    divisao = {}
    for treino_num in [1, 2, 3]:
        col = cols[treino_num]
        exercises = []
        for pos in range(1, 11):  # Positions 1..10
            row = 3 + pos  # Rows 4..13
            value = cells.get((col, row))
            if value:
                exercises.append(value)
            else:
                exercises.append(None)
        # Drop trailing Nones
        while exercises and exercises[-1] is None:
            exercises.pop()
        divisao[f"treino{treino_num}"] = exercises

    return divisao

def extract_progressao(cells):
    """Extract training progression (reps and series)."""
    cols = [col_letters_to_num(c) for c in "TUVWXY"]  # Columns T..Y

    principais = []
    auxiliares = []

    # Principais: rows 18..29 (weeks 1..12)
    for week_idx, row in enumerate(range(18, 30)):
        week_data = []
        for col in cols:
            value = cells.get((col, row))
            week_data.append(value)
        if any(v is not None for v in week_data):
            principais.append({
                "semana": week_idx + 1,
                "series": week_data
            })

    # Auxiliares: rows 33..44 (weeks 1..12)
    for week_idx, row in enumerate(range(33, 45)):
        week_data = []
        for col in cols:
            value = cells.get((col, row))
            week_data.append(value)
        if any(v is not None for v in week_data):
            auxiliares.append({
                "semana": week_idx + 1,
                "series": week_data
            })

    return {
        "principais": principais,
        "auxiliares": auxiliares
    }

def extract_semanas_data(cells, config_semanas):
    """Extract detailed week data."""
    if not config_semanas:
        return []

    semanas_data = []

    for week in range(1, int(config_semanas) + 1):
        week_data = {
            "semana": week,
            "treinos": []
        }

        for treino in range(1, 4):
            # First exercise row: r0 = 5 + (w-1)*40 + (t-1)*13
            r0 = 5 + (week - 1) * 40 + (treino - 1) * 13

            treino_data = {
                "treino": treino,
                "exercicios": [],
                "tempoSessaoMin": cells.get((col_letters_to_num("Q"), r0)),
                "pausaS": cells.get((col_letters_to_num("P"), r0)),
                "movimentosSessao": cells.get((col_letters_to_num("AE"), r0)),
                "realizado": bool(cells.get((col_letters_to_num("B"), r0 - 2)))
            }

            # Exercise positions 1..10
            for pos in range(1, 11):
                row = r0 + pos - 1
                exercise_name = cells.get((col_letters_to_num("C"), row))
                if not exercise_name:
                    continue

                # Get reps (columns D..I)
                reps = []
                for col_letter in "DEFGHI":
                    col = col_letters_to_num(col_letter)
                    val = cells.get((col, row))
                    reps.append(val)

                # Get cargas (columns J..O)
                cargas = []
                for col_letter in "JKLMNO":
                    col = col_letters_to_num(col_letter)
                    val = cells.get((col, row))
                    cargas.append(val)

                ex_data = {
                    "pos": pos,
                    "exercicio": exercise_name,
                    "reps": reps,
                    "cargas": cargas,
                    "movimentos": cells.get((col_letters_to_num("AD"), row)),
                    "rotulo": cells.get((col_letters_to_num("R"), row))
                }

                treino_data["exercicios"].append(ex_data)

            week_data["treinos"].append(treino_data)

        semanas_data.append(week_data)

    return semanas_data

def extract_monitoramento(cells):
    """Extract monitoring data (weeks 1..12)."""
    col_map = {
        "semana": "AL",
        "dataInicial": "AM",
        "movimentos": "AN",
        "cargaMedia": "AO",
        "volume": "AP",
        "sessoesAtivas": "AQ",
        "status": "AR"
    }

    cols = {k: col_letters_to_num(v) for k, v in col_map.items()}

    monitoramento_list = []

    for week_idx, row in enumerate(range(54, 66)):
        data = {}
        for key, col in cols.items():
            value = cells.get((col, row))
            if key == "dataInicial":
                value = excel_serial_to_date(value)
            data[key] = value

        # Only keep rows where movimentos is not None
        if data.get("movimentos") is not None:
            monitoramento_list.append(data)

    # Get resumo data (row 66)
    resumo = {
        "metaRobustaMovimentos": cells.get((col_letters_to_num("AN"), 66)),
        "aq66": cells.get((col_letters_to_num("AQ"), 66)),
        "as66": cells.get((col_letters_to_num("AS"), 66)),
        "av66": cells.get((col_letters_to_num("AV"), 66))
    }

    return {
        "semanas": monitoramento_list,
        "resumo": resumo
    }

def main():
    parser = argparse.ArgumentParser(description='Extract data from Excel worksheet')
    parser.add_argument('arquivo', help='Path to .xlsx file')
    args = parser.parse_args()

    xlsx_path = args.arquivo

    # Load shared strings
    print("Loading shared strings...")
    shared_strings = load_shared_strings(xlsx_path)
    print(f"Loaded {len(shared_strings)} shared strings")

    # Load Meso 3x sheet
    print("Loading Meso 3x sheet...")
    sheet_content = load_sheet(xlsx_path, "Meso 3x")
    if not sheet_content:
        print("Error: Could not load sheet")
        return

    # Parse cells
    print("Parsing cells...")
    cells = parse_cells(sheet_content, shared_strings)
    print(f"Parsed {len(cells)} cells")

    # Extract exercicios
    print("Extracting exercises...")
    exercicios = extract_exercicios(cells)
    group_count = len(exercicios)
    exercise_count = sum(len(g["exercicios"]) for g in exercicios)
    print(f"Found {group_count} groups with {exercise_count} exercises")

    # Write exercicios.json
    output_dir = Path("src/data")
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(output_dir / "exercicios.json", 'w', encoding='utf-8') as f:
        json.dump(exercicios, f, ensure_ascii=False, indent=2)
    print("Written src/data/exercicios.json")

    # Extract fixture data
    print("Extracting fixture data...")
    config = extract_meso3x_config(cells)
    divisao = extract_divisao(cells)
    progressao = extract_progressao(cells)
    semanas_data = extract_semanas_data(cells, config.get("semanas"))
    monitoramento = extract_monitoramento(cells)

    fixture = {
        "config": config,
        "divisao": divisao,
        "progressao": progressao,
        "semanas": semanas_data,
        "monitoramento": monitoramento
    }

    # Write fixture
    fixture_dir = Path("src/engine/__fixtures__")
    fixture_dir.mkdir(parents=True, exist_ok=True)
    with open(fixture_dir / "meso3x.json", 'w', encoding='utf-8') as f:
        json.dump(fixture, f, indent=2)
    print("Written src/engine/__fixtures__/meso3x.json")

    # Sanity checks
    print("\n=== SANITY CHECKS ===")
    print(f"Group count: {group_count}")
    print(f"Exercise count: {exercise_count}")
    print(f"Semanas: {config.get('semanas')}")
    print(f"Frequencia: {config.get('frequencia')}")
    print(f"PausaS: {config.get('pausaS')}")

    # Check week 1 treino 1 pos 1
    if semanas_data:
        w1 = semanas_data[0]
        if w1["treinos"]:
            t1 = w1["treinos"][0]
            if t1["exercicios"]:
                ex1 = t1["exercicios"][0]
                print(f"Week 1 Treino 1 Pos 1 reps: {ex1.get('reps')}")
            print(f"Week 1 Treino 1 tempoSessaoMin: {t1.get('tempoSessaoMin')} (expected 29.2)")

    if monitoramento["semanas"]:
        w1_mon = monitoramento["semanas"][0]
        print(f"Monitoramento week 1 movimentos: {w1_mon.get('movimentos')} (expected 216)")

if __name__ == "__main__":
    main()
