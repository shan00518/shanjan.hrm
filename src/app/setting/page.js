"use client";
import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    appearance: "Light",
    language: "English",
    twoFactorAuth: true,
    mobilePushNotifications: true,
    desktopNotifications: true,
    emailNotifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const Spinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
    </div>
  );

  const settingsOptions = [
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize how your theme looks on your device",
      type: "select",
      options: ["Light", "Dark"],
    },
    {
      id: "language",
      title: "Language",
      description: "Select your language",
      type: "select",
      options: ["English", "Hindi", "French", "Russian", "Urdu", "Punjabi"],
    },
    {
      id: "twoFactorAuth",
      title: "Two-factor Authentication",
      description: "Keep your account secure by enabling 2FA via mail",
      type: "toggle",
    },
    {
      id: "mobilePushNotifications",
      title: "Mobile Push Notifications",
      description: "Receive push notification",
      type: "toggle",
    },
    {
      id: "desktopNotifications",
      title: "Desktop",
      description: "Receive push notification in desktop",
      type: "toggle",
    },
    {
      id: "emailNotifications",
      title: "Email Notifications",
      description: "Receive email notification",
      type: "toggle",
    },
  ];

  const handleToggleChange = (id) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectChange = (id, value) => {
    setSettings((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8 mx-auto w-full max-w-screen-sm mt-12">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[400px]">
          <div className="ml-44">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4 lg:p-8 2xl:w-[217%] xl:w-[180%] lg:w-[750px] lg:ml-4 md:w-[450px] md:ml-44 2xl:ml-[-210px] xl:ml-[-110px]">
          <h1 className="text-2xl sm:text-2xl font-bold mb-6 lg:mb-8">
            Settings
          </h1>

          <div className="space-y-6 lg:space-y-8">
            {settingsOptions.map((item) => (
              <div
                key={item.id}
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
                        value={settings[item.id]}
                        onChange={(e) =>
                          handleSelectChange(item.id, e.target.value)
                        }
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
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[item.id]}
                        onChange={() => handleToggleChange(item.id)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 rounded-full peer ${
                          settings[item.id] ? "bg-green-500" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                            settings[item.id]
                              ? "translate-x-5"
                              : "translate-x-0"
                          } bg-white`}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {settings[item.id] ? "ON" : "OFF"}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsPage;
