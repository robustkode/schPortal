const variant = {
  outline: "border border-secondary  border-4 hover:border-secondary-var",
  solid: "bg-secondary shadow-md text-white hover:bg-secondary-var",
};

export default function Button({ children, outline=false, icon=undefined, onClick, className, type="button" }) {
  return (
    <div  onClick={onClick} className={`${outline ? variant["outline"] : variant["solid"] } 
    ${className} px-4 py-2 rounded flex items-center justify-center button active:scale-105 cursor-pointer`}>
          <button type={type}>
            {children}
        </button>
        {icon ? <i className="pl-4">{icon}</i> : ""}
    </div>
    
  );      
}
 