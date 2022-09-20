import { withSentry } from '@sentry/nextjs';
import prisma from '../../lib/prisma';

const handler = async (req, res) => {
    console.log("here");
    let reports = await prisma.report.findMany({
        orderBy: { submittedDate: 'desc' }
      })

    for (const report of reports) {
      const expenses = await prisma.expense.findMany({
        where: { reportId: report.id }
      })
    }
    res.status(200).json({ reports })
}

export default withSentry(handler);