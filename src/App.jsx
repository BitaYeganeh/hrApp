import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import PersonList from "./components/PersonList";

function App() {
  return (
    <>
      <Header/>
      <h1 className="siteTitle">Employee's Information</h1>
       <div className="container">
       
        <PersonList />
        

      </div>
      <Footer />
    </>
  )
}
export default App;
