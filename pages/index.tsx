import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Report, { ReportProps } from "../components/Report"
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

type Props = {
  feed: ReportProps[]
}

const Blog: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/reports', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data);
  return (
    <Layout>
      <div className="page">
        <h1>Report Feed</h1>
        <main>
          {data.reports && data.reports?.map((report) => (
            <div key={report.id} className="report">
              <Report report={report} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .report {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .report:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .report + .report {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
