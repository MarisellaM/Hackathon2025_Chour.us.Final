
import './App.css';
import './text.css';
import FakeChat from './FakeChat.jsx';
import SwiftPlanner from './SwiftPlanner.jsx';
import WeekndPlanner from './WeekndPlanner.jsx';


function App() {


  return (
  <div background-color="black">
     <div className="positionText">
    <div className="createBox">
      <h1>Concerts</h1>
    </div>

<div className="button-color">
    <div className="createTaylorBox">
    <h2 className="positionTaylorHub">Taylor Swift Hub</h2>
  </div>
</div>


<div className="button-color2">
    <div className="createWeekendBox">
    <h2 className="positionWeekendHub"> The Weekend Hub </h2>
  </div>  
</div>

<div className="positionText">
  <h1 className="schedule-style">Schedule</h1>
</div>

  <div className="createBorderBox"> </div>

    
  <FakeChat />
  <div className="createBorderBox2"></div>

<div className="position-planner">
    <WeekndPlanner />
    <SwiftPlanner />
</div>
  
  
  </div>
  </div>
 
  
  
);


}

export default App;


