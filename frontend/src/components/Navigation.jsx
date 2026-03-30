import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Navigation = ({ PageName, PageLink }) => {
  const navigate = useNavigate();

  return (
    <div className="z-50 bg-slate-900/95 backdrop-blur-md">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white active:scale-90"
        >
          <ChevronLeft size={22} />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
          {PageName}
        </h1>

        {PageLink}
      </div>
    </div>
  );
};

export default Navigation;
