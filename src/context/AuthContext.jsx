
import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

/* =====================================================
   SAFE LOCAL STORAGE JSON
===================================================== */

const getStoredData = (key, fallback = null) => {
  try {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return fallback;
    }

    return JSON.parse(storedData);
  } catch (error) {
    console.error(
      `Error reading ${key} from localStorage:`,
      error
    );

    return fallback;
  }
};


/* =====================================================
   AUTH PROVIDER
===================================================== */

export const AuthProvider = ({ children }) => {

  /* ===================================================
     CURRENT LOGGED-IN USER
  =================================================== */

  const [user, setUser] = useState(() => {
    return getStoredData("ehrUser", null);
  });


  /* ===================================================
     AUTHENTICATION STATUS
  =================================================== */

  const isAuthenticated = !!user;


  /* ===================================================
     LOGIN
  =================================================== */

  const login = (
    email,
    password,
    role
  ) => {

    const cleanEmail =
      email.trim().toLowerCase();


    /* =================================================
       GET REGISTERED USERS
    ================================================= */

    const registeredUsers =
      getStoredData(
        "ehrRegisteredUsers",
        []
      );


    /* =================================================
       FIND ACCOUNT BY EMAIL (ANY ROLE)
    ================================================= */

    const accountByEmail =
      registeredUsers.find(
        (savedUser) =>
          savedUser.email
            ?.toLowerCase() ===
          cleanEmail
      );


    /* =================================================
       ACCOUNT EXISTS -> PASSWORD MUST MATCH
    ================================================= */

    if (accountByEmail) {

      if (accountByEmail.password !== password) {

        return {
          success: false,
          message:
            "Incorrect password.",
        };

      }


      /* ===============================================
         ACCOUNT EXISTS -> ROLE MUST MATCH
      =============================================== */

      if (accountByEmail.role !== role) {

        return {
          success: false,
          message: `This account is registered as ${accountByEmail.role}. Please select the correct role to log in.`,
        };

      }

    }


    const registeredUser =
      accountByEmail &&
      accountByEmail.password === password &&
      accountByEmail.role === role
        ? accountByEmail
        : null;


    /* =================================================
       REGISTERED USER FOUND
    ================================================= */

    if (registeredUser) {

      const loggedInUser = {
        ...registeredUser,
      };


      setUser(loggedInUser);


      localStorage.setItem(
        "ehrUser",
        JSON.stringify(
          loggedInUser
        )
      );


      return {
        success: true,
        user: loggedInUser,
      };

    }


    /* =================================================
       DEMO ACCOUNT
       
       Used for testing the application.
    ================================================= */

    let userName = "";


    if (role === "Patient") {

      userName = "Arun Kumar";

    }

    else if (role === "Doctor") {

      userName = "Dr. Sharma";

    }

    else if (
      role ===
      "Hospital Administrator"
    ) {

      userName =
        "Hospital Administrator";

    }

    else if (
      role ===
      "Laboratory Staff"
    ) {

      userName =
        "Laboratory Staff";

    }


    /* =================================================
       CREATE DEMO USER
    ================================================= */

    const demoUser = {

      name: userName,

      email: email.trim(),

      phone: "",

      age: "",

      role: role,

      gender: "",

      bloodGroup: "",

      address: "",

      specialization:
        role === "Doctor"
          ? "General Medicine"
          : "",

      department:
        role === "Doctor"
          ? "General Medicine"

          : role ===
            "Laboratory Staff"
          ? "Laboratory"

          : role ===
            "Hospital Administrator"
          ? "Administration"

          : "",

      password: password,

    };


    /* =================================================
       SAVE LOGGED-IN USER
    ================================================= */

    setUser(demoUser);


    localStorage.setItem(
      "ehrUser",
      JSON.stringify(
        demoUser
      )
    );


    return {
      success: true,
      user: demoUser,
    };

  };


  /* =====================================================
     REGISTER
  ===================================================== */

  const register = (userData) => {

    const existingUsers =
      getStoredData(
        "ehrRegisteredUsers",
        []
      );


    /* =================================================
       VALIDATE EMAIL
    ================================================= */

    const emailExists =
      existingUsers.some(
        (savedUser) =>
          savedUser.email
            ?.toLowerCase() ===
          userData.email
            ?.trim()
            .toLowerCase()
      );


    if (emailExists) {

      return {
        success: false,
        message:
          "An account with this email already exists.",
      };

    }


    /* =================================================
       CLEAN USER DATA
    ================================================= */

    const newUser = {

      ...userData,

      email:
        userData.email
          ?.trim(),

    };


    /* =================================================
       SAVE USER
    ================================================= */

    const updatedUsers = [

      ...existingUsers,

      newUser,

    ];


    localStorage.setItem(
      "ehrRegisteredUsers",
      JSON.stringify(
        updatedUsers
      )
    );


    return {
      success: true,
      user: newUser,
    };

  };


  /* =====================================================
     UPDATE PROFILE
  ===================================================== */

  const updateProfile = (
    updatedProfile
  ) => {

    if (!user) {

      return {
        success: false,
        message:
          "No user is currently logged in.",
      };

    }


    /* =================================================
       UPDATE CURRENT USER
    ================================================= */

    const updatedUser = {

      ...user,

      ...updatedProfile,

    };


    setUser(updatedUser);


    localStorage.setItem(
      "ehrUser",
      JSON.stringify(
        updatedUser
      )
    );


    /* =================================================
       UPDATE REGISTERED USER
    ================================================= */

    const registeredUsers =
      getStoredData(
        "ehrRegisteredUsers",
        []
      );


    const updatedUsers =
      registeredUsers.map(
        (registeredUser) => {

          if (
            registeredUser.email
              ?.toLowerCase() ===
            user.email
              ?.toLowerCase()
          ) {

            return {

              ...registeredUser,

              ...updatedProfile,

            };

          }


          return registeredUser;

        }
      );


    localStorage.setItem(
      "ehrRegisteredUsers",
      JSON.stringify(
        updatedUsers
      )
    );


    return {

      success: true,

      user: updatedUser,

    };

  };


  /* =====================================================
     UPDATE PASSWORD
  ===================================================== */

  const updatePassword = (
    currentPassword,
    newPassword
  ) => {

    if (!user) {

      return {

        success: false,

        message:
          "No user is currently logged in.",

      };

    }


    /* =================================================
       CHECK CURRENT PASSWORD
    ================================================= */

    if (
      user.password &&
      user.password !==
        currentPassword
    ) {

      return {

        success: false,

        message:
          "Current password is incorrect.",

      };

    }


    /* =================================================
       UPDATE USER
    ================================================= */

    const updatedUser = {

      ...user,

      password:
        newPassword,

    };


    setUser(updatedUser);


    localStorage.setItem(
      "ehrUser",
      JSON.stringify(
        updatedUser
      )
    );


    /* =================================================
       UPDATE REGISTERED USERS
    ================================================= */

    const registeredUsers =
      getStoredData(
        "ehrRegisteredUsers",
        []
      );


    const updatedUsers =
      registeredUsers.map(
        (registeredUser) => {

          if (
            registeredUser.email
              ?.toLowerCase() ===
            user.email
              ?.toLowerCase()
          ) {

            return {

              ...registeredUser,

              password:
                newPassword,

            };

          }


          return registeredUser;

        }
      );


    localStorage.setItem(
      "ehrRegisteredUsers",
      JSON.stringify(
        updatedUsers
      )
    );


    return {

      success: true,

      user: updatedUser,

    };

  };


  /* =====================================================
     ROLE CHECK
  ===================================================== */

  const hasRole = (
    requiredRole
  ) => {

    if (!user) {
      return false;
    }


    if (Array.isArray(requiredRole)) {

      return requiredRole.includes(
        user.role
      );

    }


    return (
      user.role ===
      requiredRole
    );

  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "ehrUser"
    );

  };


  /* =====================================================
     PROVIDER
  ===================================================== */

  return (

    <AuthContext.Provider
      value={{

        user,

        isAuthenticated,

        login,

        register,

        updateProfile,

        updatePassword,

        logout,

        hasRole,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


/* =========================================================
   CUSTOM HOOK
========================================================= */

export const useAuth = () => {

  return useContext(
    AuthContext
  );

};
