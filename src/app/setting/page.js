// "use client";
// import React from "react";

// const Settings = () => {
//   const settingsOptions = [
//     {
//       title: "Appearance",
//       description: "Customize how your theme looks on your device",
//       type: "select",
//       options: ["Light", "Dark"],
//       defaultValue: "Light"
//     },
//     {
//       title: "Language",
//       description: "Select your language",
//       type: "select",
//       options: ["English", "Hindi", "French", "Russian", "Urdu", "Punjabi"],
//       defaultValue: "English"
//     },
//     {
//       title: "Two-factor Authentication",
//       description: "Keep your account secure by enabling 2FA via mail",
//       type: "toggle",
//       defaultValue: true
//     },
//     {
//       title: "Mobile Push Notifications",
//       description: "Receive push notification",
//       type: "toggle",
//       defaultValue: true
//     },
//     {
//       title: "Desktop",
//       description: "Receive push notification in desktop",
//       type: "toggle",
//       defaultValue: true
//     },
//     {
//       title: "Email Notifications",
//       description: "Receive email notification",
//       type: "toggle",
//       defaultValue: true
//     },
//   ];

//   return (
//     <section className="px-4 py-6 sm:px-6 lg:px-8 mx-auto w-[900px] max-w-screen-sm xl:max-w-screen-xl 2xl:max-w-screen-2xl mt-16 md:mt-20 lg:mt-24">
//       <div className="border border-gray-200 rounded-xl p-4 lg:p-8 xl:w-[1100px] xl lg:w-[750px] lg:ml-4 md:w-[450px] md:ml-44">
//         <h1 className="text-2xl sm:text-2xl font-bold mb-6 lg:mb-8">Settings</h1>
        
//         <div className="space-y-6 lg:space-y-8">
//           {settingsOptions.map((item, i) => (
//             <div 
//               key={i} 
//               className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
//             >
//               <div className="flex-1 min-w-0">
//                 <h2 className="font-medium text-lg sm:text-xl lg:text-lg xl:text-xl">
//                   {item.title}
//                 </h2>
//                 <p className="text-gray-500 text-sm sm:text-base lg:text-sm xl:text-base">
//                   {item.description}
//                 </p>
//               </div>
              
//               <div className="w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]">
//                 {item.type === "select" ? (
//                   <div className="relative w-full sm:w-40 lg:w-44 xl:w-48">
//                     <select
//                       defaultValue={item.defaultValue}
//                       className="appearance-none w-full cursor-pointer px-4 py-2 bg-gray-50 text-gray-800 text-sm sm:text-base lg:text-sm xl:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
//                     >
//                       {item.options.map((option) => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>
//                 ) : (
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input 
//                       type="checkbox" 
//                       defaultChecked={item.defaultValue} 
//                       className="sr-only peer" 
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-checked:bg-green-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 transition-all duration-300">
//                       <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
//                     </div>
//                   </label>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Settings;







"use client";
import React from "react";

const Settings = () => {
  const settingsOptions = [
    {
      title: "Appearance",
      description: "Customize how your theme looks on your device",
      type: "select",
      options: ["Light", "Dark"],
      defaultValue: "Light",
    },
    {
      title: "Language",
      description: "Select your language",
      type: "select",
      options: ["English", "Hindi", "French", "Russian", "Urdu", "Punjabi"],
      defaultValue: "English",
    },
    {
      title: "Two-factor Authentication",
      description: "Keep your account secure by enabling 2FA via mail",
      type: "toggle",
      defaultValue: true,
    },
    {
      title: "Mobile Push Notifications",
      description: "Receive push notification",
      type: "toggle",
      defaultValue: true,
    },
    {
      title: "Desktop",
      description: "Receive push notification in desktop",
      type: "toggle",
      defaultValue: true,
    },
    {
      title: "Email Notifications",
      description: "Receive email notification",
      type: "toggle",
      defaultValue: true,
    },
  ];

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8 mx-auto w-[full] max-w-screen-sm   mt-12 md:mt-20 lg:mt-24 xl:mt-16">
      <div className="border border-gray-200 rounded-xl p-4 lg:p-8 xl:w-[180%]  lg:w-[750px] lg:ml-4 md:w-[450px] md:ml-44 xl:ml-[-110px] ">
        <h1 className="text-2xl sm:text-2xl font-bold mb-6 lg:mb-8">Settings</h1>
        
        <div className="space-y-6 lg:space-y-8">
          {settingsOptions.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-lg sm:text-xl lg:text-lg xl:text-xl">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base lg:text-sm xl:text-base">
                  {item.description}
                </p>
              </div>

              <div className="w-full sm:w-auto sm:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]">
                {item.type === "select" ? (
                  <div className="relative w-full sm:w-40 lg:w-44 xl:w-48">
                    <select
                      defaultValue={item.defaultValue}
                      className="appearance-none w-full cursor-pointer px-4 py-2 bg-gray-50 text-gray-800 text-sm sm:text-base lg:text-sm xl:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    >
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <label className="relative inline-flex items-center cursor-pointer md:ml-28 ">
                    <input 
                      type="checkbox" 
                      defaultChecked={item.defaultValue} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-green-500 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-300 transition-all duration-300">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
                    </div>
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Settings;
