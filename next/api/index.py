from io import BytesIO
from flask import Flask, request, send_file, json
from flask.wrappers import Response
import xlsxwriter

def spreadsheet(mortgages: list, output):

    letter = ord("A")
    num = 0

    alphaMap = {}

    while num < 26:
        alphaMap[num] = chr(letter)
        letter += 1
        num += 1
    workbook = xlsxwriter.Workbook(output, {'in_memory': True})
    bold = workbook.add_format({'bold': True, 'fg_color': "D3D3D3"})
    money = workbook.add_format({'num_format': '$#,##0.00;[RED]($#,##0.00)'})
    percent = workbook.add_format({'num_format': '0.000%'})
    boldPercent = workbook.add_format(
        {'num_format': '0.000%', 'bold': True, 'fg_color': "D3D3D3"})
    blue = workbook.add_format({"fg_color": "C5D9F1", 'bold': True})
    red = workbook.add_format({"fg_color": "E6B8B7", 'bold': True})
    gold = workbook.add_format({"fg_color": "DDD9C4", 'bold': True})

    worksheet = workbook.add_worksheet("Mortgages")
    worksheet.write(0, 0, "Discount Rate", bold)
    worksheet.write(0, 1, 0.05, boldPercent)
    worksheet.write(9, 0, "Month #")
    for i in range(10, 371):
        worksheet.write(i, 0, i - 10)

    headings = ["Lender", "Interest Rate", "Monthly Payment", "Delta",
                "Discount Point Cost", "Other Costs", "Upfront Credits"]

    row = 1
    for item in headings:
        worksheet.write(row, 0, item, bold)
        row += 1

    row = 1
    col = 1

    colorMap = {0: red, 1: blue, 2: gold}

    def sortFunc(dict):
        return dict["monthlyPandI"]

    mortgages.sort(reverse=True, key=sortFunc)

    for dict in mortgages:
        for key, value in dict.items():
            if key == "id" or key == "isNew":
                continue
            if row == 4:
                worksheet.write(row, col, f"=$B$4 -{alphaMap[col]}$4", money)
                row += 1
            worksheet.write(row, col, value/100 if row ==
                            2 else value, colorMap[col % 3] if row == 1 else percent if row == 2 else money)
            row += 1
        worksheet.write(
            10, col, f"={alphaMap[col]}$8 - ({alphaMap[col]}$7 + {alphaMap[col]}$6)", money)
        for i in range(360):
            worksheet.write(
                i + 11, col, f"={alphaMap[col]}$5/((1+$B$1)^($A{i + 12}/12)) + {alphaMap[col]}{i + 11}", money)
        row = 1
        col += 1

    worksheet.set_column(0, len(mortgages), 18)
    green = workbook.add_format({"bg_color": "C4D79B"})
    worksheet.conditional_format(10, 1, 370, len(mortgages), {
                                 'type': 'formula', 'criteria': f'=B11=MAX($B11:{alphaMap[len(mortgages)]}11)', "format": green})
    workbook.close()

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['POST'])
def catch_all(path):
    response = Response()
    if request.method == "POST":
        mortgages = json.loads(request.data)
        if not mortgages:
            response.status = 400
            return response
        else:
            output = BytesIO()
            spreadsheet(mortgages, output)
            output.seek(0)
            return send_file(output, attachment_filename="mortgages.xlsx", as_attachment=True)
    response.status = 500
    return response
