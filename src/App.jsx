import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Person from "./components/Person";

function App() {
  return (
    <>
      <Header/>
       <div className="container">
        <Person 
          name="Sarah Smith"
          title="Frontend Developer"
          salary="3800€/month"
          phone="+358-40 123 0 456"
          email="sarah.smith@gmail.com"
          animal="Dog"
        />
         <Person 
          name="Alex Blue"
          title="Frontend Developer"
          salary="3800€/month"
          phone="+358-50 123 4 567"
          email="alex.b@gmail.com"
          animal="Cat"
        />

      </div>
      <Footer />
    </>
  )
}
export default App;
