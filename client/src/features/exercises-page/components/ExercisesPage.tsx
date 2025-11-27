import { useGetAllExercises } from "@client/lib/api/practitioner/query";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ExercisePageFilters } from "./ExercisePageFilters";
import { ExercisesGrid } from "./ExercisesGrid";
import { useState } from "react";

export const ExercisesPage = () => {
  const { data: exercises } = useGetAllExercises();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTargetArea, setSelectedTargetArea] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredExercises = exercises?.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTargetArea =
      selectedTargetArea === "All" ||
      exercise.targetArea === selectedTargetArea;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      exercise.difficulty === selectedDifficulty;

    return matchesSearch && matchesTargetArea && matchesDifficulty;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedTargetArea("All");
    setSelectedDifficulty("All");
  };

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const handleTargetAreaChange = (area: string) => {
    setSelectedTargetArea(area);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const renderHeader = (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Exercise Library
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and filter through our comprehensive collection of physical
          therapy exercises
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Showing {filteredExercises?.length} of {filteredExercises?.length}{" "}
        exercises
      </Typography>
    </Stack>
  );

  const renderExerciseFilters = (
    <ExercisePageFilters
      searchTerm={searchTerm}
      selectedTargetArea={selectedTargetArea}
      selectedDifficulty={selectedDifficulty}
      handleClearFilters={handleClearFilters}
      handleSearchTerm={handleSearchTerm}
      handleTargetAreaChange={handleTargetAreaChange}
      handleDifficultyChange={handleDifficultyChange}
    />
  );

  const renderExercisesGrid = (
    <ExercisesGrid filteredExercises={filteredExercises} />
  );

  const renderNoExercisesFound =
    filteredExercises?.length === 0 ? (
      <Card>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h1" sx={{ fontSize: 64, opacity: 0.5, mb: 2 }}>
            🔍
          </Typography>
          <Typography variant="h6" gutterBottom>
            No exercises found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Try adjusting your search terms or filters to find exercises.
          </Typography>
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear all filters
          </Button>
        </CardContent>
      </Card>
    ) : null;

  return (
    <Stack spacing={3}>
      {renderHeader}
      {renderExerciseFilters}
      {renderExercisesGrid}
      {renderNoExercisesFound}
    </Stack>
  );
};
