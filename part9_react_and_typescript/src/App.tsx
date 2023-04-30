import Header from './components/Header'
import Total from './components/Total'
import Content from './components/Content';

const App = () => {
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};


export default App;