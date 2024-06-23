import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

async function loginUser(credentials) {
  return fetch('http://localhost:8080/api/login/' + credentials.reqType, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
};

export default function Login() {
  const [UserId, setUserName] = useState();
  const [UserPassword, setPassword] = useState();
  const [FailAttempt, setAttempt] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const btn_Click = async (e, loginType) => {
    e.preventDefault();

    const data = await loginUser({
      reqType: loginType === "user" ? "nomalUser" : "Root",
      UserId,
      UserPassword
    });

    if(data.code === "200"){
      setAttempt(null);
      login({token: data.accessToken, UserId, mode: loginType});
      navigate("/");
    }
    else{
      setAttempt("fail");
    }
  }

  return (
    <div class="w-full max-w-xs m-auto pt-20">
      <h1 className="text-center text-gray-700 font-bold text-[2rem]" style={{marginBottom: '20px'}}>Đăng nhập</h1>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            UserId
          </label>
          <input class={`shadow appearance-none border rounded ${UserId === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="username" type="text" placeholder="UserId" onChange={e => setUserName(e.target.value)}/>
          {UserId === "" && <p class="text-red-500 text-xs italic">Please enter UserId.</p>}
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class={`shadow appearance-none border rounded ${UserPassword === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="*********" onChange={e => setPassword(e.target.value)}/>
          {UserPassword === "" && <p class="text-red-500 text-xs italic">Please choose a password.</p>}
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={(e) => btn_Click(e, "user")}>
            Sign In
          </button>
          <button class="inline-block align-baseline font-bold text-sm border rounded bg-red-500 border-red-500 px-3 py-2 text-white hover:bg-red-800" type="button" onClick={(e) => btn_Click(e, "admin")}>
            Login as admin
          </button>
        </div>
        <div className='flex justify-center mt-3'>
          <button className="text-blue-600 hover:text-blue-800" onClick={e => {navigate("/forgetpass")}}>Forget password?</button>
        </div>
        {FailAttempt && <div className="text-red-500" style={{marginTop: "10px", textAlign: 'center'}}>UserId or Password is wrong!</div>}
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
