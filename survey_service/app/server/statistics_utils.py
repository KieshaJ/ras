from fpdf import FPDF
from server.database import (
    get_survey,
    get_survey_statistic,
    get_answer_statistic
)


async def create_pdf(survey: dict):
    pdf = FPDF()
    pdf.add_page()

    pdf.set_xy(0, 0)
    pdf.set_font('arial', 'B', 12)
    pdf.cell(60)

    survey_stat = await get_survey_statistic(survey["id"])

    pdf.cell(75, 10, survey["name"], 0, 2, 'C')
    pdf.cell(90, 10, " ", 0, 2, 'C')
    pdf.cell(-40)
    pdf.cell(75, 10, "Iš viso užpildė: %s" % str(survey_stat["submitted"]), 0, 2, 'C')
    pdf.cell(90, 10, " ", 0, 2, 'C')

    for s in survey["sections"]:
        for q in s["questions"]:
            pdf.set_font('arial', 'B', 12)
            pdf.cell(160, 20, q["title"], 0, 2, 'C')
            pdf.cell(90, 10, " ", 0, 2, 'C')

            pdf.cell(80, 10, 'Atsakymas', 1, 0, 'C')
            pdf.cell(80, 10, 'Pasirinkimų sk.', 1, 2, 'C')
            pdf.cell(-80)
            pdf.set_font('arial', '', 12)
            for a in q["answers"]:
                answer_stat = await get_answer_statistic(a["id"])
                pdf.cell(80, 10, a["title"], 1, 0, 'C')
                pdf.cell(80, 10, str(answer_stat["submitted"]), 1, 2, 'C')
                pdf.cell(-80)

            pdf.cell(90, 20, " ", 0, 2, 'C')

    pdf.output('reports/test.pdf', 'F')

