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
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";

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
    <Box className="text-white mb-6">
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 4,
          background: "linear-gradient(135deg, #2d2d30, #1f1f1f)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#fefefe", mb: 2 }}
        >
          <FaSearch className="inline-block mr-2" />
          Filter News
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="q"
              label="Keyword (required)"
              value={filters.q}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#333",
                },
              }}
            />
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel shrink sx={{ color: "#ccc" }}>
                Language
              </InputLabel>
              <Select
                name="language"
                value={filters.language}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected)
                    return <span style={{ color: "#888" }}>All Languages</span>;
                  return selected.toUpperCase();
                }}
                sx={{
                  color: "#fff",
                  backgroundColor: "#333",
                  ".MuiSvgIcon-root": { color: "#fff" },
                  minWidth: 140,
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#aaa" }}>All Languages</em>
                </MenuItem>
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: "#ccc" }}>Sort By</InputLabel>
              <Select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleChange}
                sx={{
                  color: "#fff",
                  backgroundColor: "#333",
                  ".MuiSvgIcon-root": { color: "#fff" },
                }}
              >
                {sortOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel shrink sx={{ color: "#ccc" }}>
                Source
              </InputLabel>
              <Select
                name="sources"
                value={filters.sources}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected)
                    return <span style={{ color: "#888" }}>All Sources</span>;
                  const selectedObj = sources.find((s) => s.id === selected);
                  return selectedObj?.name || selected;
                }}
                sx={{
                  color: "#fff",
                  backgroundColor: "#333",
                  ".MuiSvgIcon-root": { color: "#fff" },
                  minWidth: 180,
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 400,
                      width: 300,
                      backgroundColor: "#1f1f1f",
                      color: "#fff",
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#aaa" }}>All Sources</em>
                </MenuItem>
                {sources.map((source) => (
                  <MenuItem key={source.id} value={source.id}>
                    {source.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="domains"
              label="Include Domains"
              value={filters.domains}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#333",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="excludeDomains"
              label="Exclude Domains"
              value={filters.excludeDomains}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#333",
                },
              }}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              name="from"
              label="From"
              type="date"
              value={filters.from}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#333",
                },
              }}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              name="to"
              label="To"
              type="date"
              value={filters.to}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#333",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#aaa", fontWeight: 500, mb: 0.5 }}
            >
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
                      sx={{ color: "#ccc" }}
                    />
                  }
                  label={opt}
                  sx={{ color: "#eee" }}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={onSearch}
              variant="contained"
              fullWidth
              startIcon={<FaSearch />}
              sx={{
                background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                fontWeight: "bold",
                fontSize: "15px",
                py: 1.4,
                borderRadius: 2,
                ":hover": {
                  background: "linear-gradient(90deg, #1976d2, #00bcd4)",
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
