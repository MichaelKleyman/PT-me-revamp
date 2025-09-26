import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const targetAreas = [
  "All",
  "Lower Back",
  "Core",
  "Legs",
  "Shoulders",
  "Hips",
  "Neck",
];

type TExercisePageFiltersProps = {
  searchTerm: string;
  selectedTargetArea: string;
  selectedDifficulty: string;
  handleClearFilters: () => void;
  handleSearchTerm: (term: string) => void;
  handleTargetAreaChange: (area: string) => void;
  handleDifficultyChange: (difficulty: string) => void;
};

export const ExercisePageFilters = (props: TExercisePageFiltersProps) => {
  const {
    searchTerm,
    selectedTargetArea,
    selectedDifficulty,
    handleClearFilters,
    handleSearchTerm,
    handleTargetAreaChange,
    handleDifficultyChange,
  } = props;

  return (
    <Card>
      <CardHeader title="Filters" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => handleSearchTerm(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Target Area</InputLabel>
              <Select
                value={selectedTargetArea}
                label="Target Area"
                onChange={(e) => handleTargetAreaChange(e.target.value)}
              >
                {targetAreas.map((area) => (
                  <MenuItem key={area} value={area}>
                    {area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={selectedDifficulty}
                label="Difficulty"
                onChange={(e) => handleDifficultyChange(e.target.value)}
              >
                <MenuItem value="All">All Levels</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button variant="outlined" fullWidth onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
