import './text.css';

function Login(){
  return (
    <div className="center-login">
      <h1>Login Page</h1>
      <input type="text" placeholder="Create your Password" className="style-login" id="storePassword"></input>
      <input type="text" placeholder="Enter your Password" className="style-login"></input>

    

      <script>
        let truePassword = document.getElementById("storePassword").value;
      </script>
    </div>
  );
}





