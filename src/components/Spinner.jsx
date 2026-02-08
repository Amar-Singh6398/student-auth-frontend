export default function Spinner({ size = "md" }) {
    const sizes = {
      sm: "w-4 h-4 border-2",
      md: "w-5 h-5 border-2",
      lg: "w-8 h-8 border-4"
    };
  
    return (
      <div
        className={`
          ${sizes[size]}
          border-white/30
          border-t-white
          rounded-full
          animate-spin
        `}
      />
    );
  }
  