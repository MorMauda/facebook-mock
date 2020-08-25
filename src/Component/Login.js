import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props) {
    const url = "http://localhost:";
    const port = "4000";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    const username = useFormInput('');
    const password = useFormInput('');


    /*Extra data for signUp*/
    const username_su = useFormInput('');
    const password_su = useFormInput('');
    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const gender = useFormInput('');
    // const dob_day = useFormInput('');
    // const dob_month = useFormInput('');
    // const dob_year = useFormInput('');


    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post(url+port +'/users/signin', {
            username: username.value,
            password: password.value
        }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);

            props.history.push({
                pathname: '/ProfilePage',
                state: { data: response.data.user} // your data array of objects
            })
             // props.history.push('/ProfilePage',{ response: response.data.user });
        }).catch(error => {
            // alert("In Catch clause "+ error.response.status);
            setLoading(false);

            if (error.response == undefined){
                alert("You are not connected to the server "+ error);

            } else if (error.response.status === 401) {
                alert(error.response.data.message);
                setError(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again later.");
                setError("Something went wrong. Please try again later.");
            }
        });
    }

    const handleSignUp = () => {
        if (!username_su.value || !lastName.value || !firstName.value || !password_su){
            alert("All field are required." );
            return;
        }
        axios.post(url+port +'/users', {
            user_name: username_su.value,
            last_name: lastName.value,
            first_name: firstName.value,
            password: password_su.value,
        }).then(response => {
            alert("User "+ username_su.value + " created. Please use Login to connect Semi-FaceBook" );
            console.log("Success! " ,response);
        }).catch(error => {
            if (error.response === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

        return (
            <div>
                <div id="navwrapper">
                    <div id="navbar">
                        <table className="tablewrapper">
                            <tr>
                                <td className="row1">Email or Phone</td>
                                <td className="row1">Password</td>
                            </tr>
                            <tr>
                                <td><input type="text" {...username} autoComplete="username"/></td>

                                <td><input type="password" {...password} autoComplete="new-password"/></td>

                                <td>
                                    <input id="login_button_fb" type="button" value={loading ? 'Loading...' : 'Log In'}
                                           onClick={handleLogin} disabled={loading}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="row2"><input type="checkbox" checked/> Keep me logged in</div>
                                </td>
                                <td className="row2 h">Forgot your password?</td>
                            </tr>
                        </table>
                        <h1 className="logowrapper">Semi - Facebook</h1>


                    </div>
                </div>
                <div id="contentwrapper">
                    <div id="content">

                        <div id="leftbod">

                            <div className="connect bolder">
                                Connect with friends and the
                                world around you on Facebook.
                            </div>

                            <div className="leftbar">
                                <div className="fb1">
                                    <span className="rowtext">See photos and updates</span>
                                    <span className="rowtext2 fb1">from friends in News Feed</span>
                                </div>
                            </div>

                            <div className="leftbar">
                                <div className="fb1">
                                    <span className="rowtext">Share what's new</span>
                                    <span className="rowtext2 fb1">in your life on your timeline</span>
                                </div>
                            </div>

                            <div className="leftbar">
                                <div className="fb1">
                                    <span className="rowtext">Find more</span>
                                    <span className="rowtext2 fb1">of what you're looking for with graph search</span>
                                </div>
                            </div>
                        </div>
                        <div id="rightbod">
                            <div className="signup bolder">Sign Up</div>
                            <div className="free bolder">It's free and always will be</div>

                            <div className="formbox">
                                <input type="text" {...firstName} className="inputbody in1" autoComplete="firstname"
                                       placeholder="First name" required={true}/>
                                <input type="text" {...lastName} className="inputbody in1 fl" autoComplete="lastname"
                                       placeholder="Last name" required={true}/>
                            </div>
                            <div className="formbox">
                                <input type="text" {...username_su} className="inputbody in2" autoComplete="username"
                                       placeholder="Email or mobile number" required={true}/>
                            </div>

                            <div className="formbox">
                                <input type="text" {...password_su} className="inputbody in2" autoComplete="password"
                                       placeholder="New password" required={true}/>
                            </div>

                            <div className="formbox">

              <div className="formbox mt1">

                                </div>
                                <div className="formbox">
                                    <div className="agree">
                                        By clicking Sign Up, you will create a user in my <div
                                        className="link">Faceafeka</div>
                                        project;)

                                    </div>
                                </div>
                                <div className="formbox">
                                    <button type="submit" className="signbut bolder" onClick={handleSignUp}>Sign Up</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {error && <><small style={{color: 'red'}}>{error}</small><br/></>}<br/>
                {/*<input id= "login_button_fb" type="button" value={loading ? 'Loading...' : 'Log In'} onClick={handleLogin} disabled={loading} /><br />*/}


            </div>
        );
    }


const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;