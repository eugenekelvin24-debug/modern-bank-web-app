const Greeting = ({ name }) => {
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
      <p className="text-x1 text-white font-sans-serif">
        {greeting}, {name}
      </p>
    </div>
  );
};

export default Greeting;
