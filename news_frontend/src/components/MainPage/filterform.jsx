import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";

const languages = ["en", "es", "fr", "de", "it", "pt"];
const searchOptions = ["title", "description", "content"];
const sortOptions = ["publishedAt", "relevancy", "popularity"];

export default function FilterForm({ filters, setFilters, onSearch, sources }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, option) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name].includes(option)
        ? prev[name].filter((o) => o !== option)
        : [...prev[name], option],
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        p: 3,
        boxShadow: 3,
        mb: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            name="q"
            label="Keyword (required)"
            value={filters.q}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth sx={{ minWidth: 160 }}>
            <InputLabel shrink>Language</InputLabel>
            <Select
              name="language"
              value={filters.language}
              onChange={handleChange}
              label="Language"
              displayEmpty
              renderValue={(selected) => {
                if (!selected) return "All Languages";
                return selected.toUpperCase();
              }}
            >
              <MenuItem value="">
                <em>All Languages</em>
              </MenuItem>
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              label="Sort By"
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormControl fullWidth sx={{ minWidth: 300 }}>
            <InputLabel shrink>Source</InputLabel>
            <Select
              name="sources"
              value={filters.sources}
              onChange={handleChange}
              label="Source"
              displayEmpty
              renderValue={(selected) => {
                if (!selected) return "All Sources"; // 👈 Display properly
                const selectedObj = sources.find((s) => s.id === selected);
                return selectedObj?.name || selected;
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 400,
                    width: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>All Sources</em>
              </MenuItem>
              {sources.map((source) => (
                <MenuItem key={source.id} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            name="domains"
            label="Include Domains"
            value={filters.domains}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            name="excludeDomains"
            label="Exclude Domains"
            value={filters.excludeDomains}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            name="from"
            label="From"
            type="date"
            value={filters.from}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            name="to"
            label="To"
            type="date"
            value={filters.to}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 0.5, color: "#333" }}>
            Search In:
          </Typography>
          <FormGroup row>
            {searchOptions.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={filters.searchIn.includes(opt)}
                    onChange={() => handleMultiSelect("searchIn", opt)}
                  />
                }
                label={opt}
                sx={{ color: "#000" }}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={onSearch}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#1565c0" },
              color: "#fff",
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
