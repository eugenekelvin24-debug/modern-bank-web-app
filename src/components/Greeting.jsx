import { MOCK_DATA } from "../Data/user";

const { user } = MOCK_DATA;

const Greeting = () => {

    const hours = new Date().getHours();

    let greeting;

    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

  return (
    <div>
        <p className="text-x1 text-white font-sans-serif">{greeting}, {user.name}</p>
    </div>
 
  )
}

export default Greeting
