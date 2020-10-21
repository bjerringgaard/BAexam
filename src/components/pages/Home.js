import React, {useState} from 'react';
//import { useFirestoreDocData, useFirestore, SuspenseWithPerf} from 'reactfire';

const HomePage = () => {


{/* Dataen der skal bruges er i en state */}
const [articles, setArticle] = useState([
    {headline: 'Dette er en test', shortHeadline: 'jah det er rigtigt'},
    {headline: 'Cola smager godt', shortHeadline: 'hmm det gør det nok'},
    {headline: 'Det er fredag i dag', shortHeadline: 'så det pizza tid'}  
  ])


    return (
        <div>
            <div className="grid-container">
        <div className="grid-x frontpage-container">
        <div className="cell auto">
       
        <h1>Build something</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Quisque non lacinia erat. 
          Suspendisse sagittis metus ut est tincidunt, a consectetur elit porta. 
          In at congue velit. Vivamus rutrum dictum ultrices. </p>
        </div>
      </div>

      <h3 className="latest">Latest Articles</h3>
        <div className="grid-x latest-articles grid-margin-x grid-margin-y">
          {/* Mapper igennem indholdet af State */}
          {articles.map(article =>(
          <div className="cell small-12 medium-4 large-12">
            <div className="cell latest-articles__box">Billede</div>
            <div className="cell latest-articles__text">
              <h4>{article.headline}</h4>
              {article.shortHeadline}
              </div>
          </div>
          ))}
        </div>
        </div>
        </div>
    )
}

export default HomePage;