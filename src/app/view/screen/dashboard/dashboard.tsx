import React, { useState, useEffect } from "react";
import { User } from '../../../storage/index'
import { onLogout } from '../../../routing/authService'

function Dashboard() {

  const [userData, setUserData] = useState({
      first_name: "", last_name: "", email: ''
  });

  useEffect(()=>{
    let data = User.getUserDetails();
    if (data && data.user_data) {
      setUserData({ ...data.user_data});
    }
  },[]);



    return (
        <div className="login_signup main-site">
            <main className="site-body">
                <section className="middle-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h4> Welcome to Dashboard!! </h4>
                                    </div>
                                    <div className="card-body">

                                        <h3 className=" text-center">Hi {userData.first_name ? userData.first_name : ''} {userData.last_name ? userData.last_name : ''},</h3>
                                        <h5 className=" text-center">Email : {userData.email ? userData.email : ''}</h5>
                                        <div className="text-center mt-3"><button className="btn btn-danger" onClick={() => onLogout()}> Logout </button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard
