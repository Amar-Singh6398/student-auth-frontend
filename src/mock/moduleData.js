export const modulesData = [
    {
      id: "basic",
      title: "Basic",
      unlocked: true,
      lessons: [
        {
          title: "HTML Basics",
          videoUrl: "https://www.youtube.com/embed/BsDoLVMnmZs",
          completed: false,
        },
        {
          title: "CSS Basics",
          videoUrl: "https://www.youtube.com/embed/Edsxf_NBFrw",
          completed: false,
        },
        {
          title: "JavaScript Basics",
          videoUrl: "https://www.youtube.com/embed/hKB-YGF14SY",
          completed: false,
        },
        {
          title: "Git & GitHub",
          videoUrl: "https://www.youtube.com/embed/gwWKnnCMQ5c",
          completed: false,
        },
      ],
    },
    {
      id: "intermediate",
      title: "Intermediate",
      unlocked: false,
      lessons: [
        {
         title:"React Fundamentals",
         videoUrl: "https://www.youtube.com/embed/-mJFZp84TIY" ,
         completed:false 
        },
        {title:"State & Props", completed:false},
        {title:"API Integration", completed:false},
        {title:"Authentication", completed:false},
      ],
    },
    {
      id: "advanced",
      title: "Advanced",
      unlocked: false,
      lessons: [
        {title:"Node.js & Express", completed:false},
        {title:"MongoDB", completed:false},
        {title:"Full Stack Auth", completed:false},
        {title:"Deployment", completed:false},
      ],
    },
  ];
  