import { Patient, TAuthRegisterForm } from "../types/auth";
import { Exercise } from "../types/exercise";
import { api } from "./api";

// QUERIES

/** Grabs user details from the server */
export const getCurrentUser = async () => {
  try {
    const res = await api.me.$get();
    const data = await res.json();
    return { user: data.user };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

// GET practice
export const getPractice = async (practiceId: string) => {
  try {
    const res = await api.practice[":practiceId"].$get({
      param: { practiceId },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching practice:", error);
    throw new Error("Failed to fetch practice");
  }
};

// GET patient
export const getPatient = async (patientId: string) => {
  try {
    const res = await api.patients[":patientId"].$get({
      param: { patientId },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching patient:", error);
  }
};

// GET all patients
export const getAllPatients = async (practiceId: string) => {
  try {
    const res = await api.patients.practice[":practiceId"].$get({
      param: { practiceId },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error("Error fetching all patients:", error);
  }
};

/** GET all the patients current exercises */
export const getPatientsExercises = async (patientId: string) => {
  try {
    const res = await api.patients.exercises[":patientId"].$get({
      param: { patientId },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all patients exercises:", error);
  }
};

// GET exercise
export const getExercise = async (exerciseId: string) => {
  try {
    const res = await api.exercises[":exerciseId"].$get({
      param: { exerciseId },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching exercise:", error);
  }
};

// GET all exercises
export const getAllExercises = async () => {
  try {
    const res = await api.exercises.$get();
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all exercises:", error);
  }
};

// MUTATIONS

export const registerUser = async (userData: TAuthRegisterForm) => {
  // Store all the data in session
  await api.registrationData.$post({
    json: userData,
  });

  window.location.href = `/api/register/${userData.email}`;
};

export const loginUser = (email: string) => {
  window.location.href = `/api/login/${email}`;
};

// POST new patient
export const createPatient = async (data: Patient) => {
  try {
    const newPatient = await api.patients.$post({ json: data });
    return newPatient;
  } catch (error) {
    console.error("Error creating new patient:", error);
  }
};

// DELETE patient
export const deletePatient = async (id: string) => {
  try {
    await api.patients.delete[":patientId"].$delete({
      param: { patientId: id },
    });
  } catch (error) {
    console.error("Error deleting new patient:", error);
  }
};

// POST new exercise
export const createExercise = async (data: Exercise) => {
  try {
    const newExercise = await api.exercises.$post({ json: data });
    return newExercise;
  } catch (error) {
    console.error("Error creating new exercise:", error);
  }
};

// DELETE exercise
export const deleteExercise = async (id: string) => {
  try {
    await api.exercises.delete[":exerciseId"].$delete({
      param: { exerciseId: id },
    });
  } catch (error) {
    console.error("Error deleting exercise:", error);
  }
};
