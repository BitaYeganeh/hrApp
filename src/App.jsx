import Header from "./components/Header";
import Footer from "./components/Footer";
import Person from "./components/Person"

import './App.css'

function App() {
  return (
    <div>
      <Header />
       <main>
        <Person 
          name="Bita Yeganeh"
          title="Frontend Developer"
          salary="3800€/month"
          phone="+358-40 123 0 456"
          email="s2500286@edu.bc.fi"
          animal="Owl"
        />

      </main>
      <Footer />
    </div>
  )
}
export default App;
