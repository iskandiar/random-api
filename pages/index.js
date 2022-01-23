import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

const apis = [
  {
    name: 'Get random item from the list',
    path: '/api/random/item?list=abc|bcd|dsa&pick=2',
  },
  {
    name: 'Get UUID',
    path: '/api/random/uuid',
  },
  {
    name: 'Get random number',
    path: '/api/random/number?min=1&max=100',
  },
  {
    name: 'Get dice result',
    path: '/api/random/dice',
  }
]
function Home({host}) {
  return (
    <div className="container">
      <Head>
        <title>Random API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Random API!" />
        <ul>
          {apis.map(({name, path}, idx) => (
            <div key={idx}>
              <h4>{name}</h4>
              <p>
                <code>{`${host}${path}`}</code>
              </p>
            </div>
          ))}
        </ul>
        <p>
            You can change format by adding <code>&format=json</code> to response, and save query with <code>&save=true</code>.
        </p>
      </main>

      <Footer />
    </div>
  )
}

Home.getInitialProps = async ({req}) => {
  return { host: req.headers.host }
}

export default Home
