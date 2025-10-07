import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function IncidentList() {
  const [incidents, setIncidents] = useState([
    { id: "INC-741085", priority: "Medium", severity: "3 - Low", status: "Closed" },
    { id: "INC-602934", priority: "Critical", severity: "1 - Critical", status: "Resolved" },
    { id: "INC-74108222", priority: "Medium", severity: "3 - Low", status: "Closed" },
    { id: "INC-7412235085", priority: "High", severity: "2 - Medium", status: "Open" },
    { id: "INC-852963", priority: "Low", severity: "3 - Low", status: "In Progress" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ priority: "", severity: "", status: "" });

  const handleDelete = (id) => setIncidents(incidents.filter((i) => i.id !== id));
  const handleEdit = (incident) => {
    setEditingId(incident.id);
    setEditData({
      priority: incident.priority,
      severity: incident.severity,
      status: incident.status,
    });
  };
  const handleSave = (id) => {
    setIncidents(incidents.map((i) => (i.id === id ? { ...i, ...editData } : i)));
    setEditingId(null);
  };
  const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const filteredIncidents = incidents.filter((i) =>
    i.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Incident List
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search by Incident ID"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, backgroundColor: "white", borderRadius: 4 }}
      />

      {/* Card Grid */}
      <Grid container spacing={3}>
        {filteredIncidents.map((incident) => (
          <Grid item xs={12} sm={6} md={4} key={incident.id}>
            <Card sx={{ boxShadow: 4, backgroundColor: "background.paper" }}>
              <CardContent>
                {editingId === incident.id ? (
                  <>
                    <Typography variant="h6">{incident.id}</Typography>
                    <TextField
                      label="Priority"
                      name="priority"
                      value={editData.priority}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Severity"
                      name="severity"
                      value={editData.severity}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Status"
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      fullWidth
                      margin="dense"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleSave(incident.id)}
                      sx={{ mt: 1 }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{incident.id}</Typography>
                    <Typography>
                      <strong>Priority:</strong> {incident.priority}
                    </Typography>
                    <Typography>
                      <strong>Severity:</strong> {incident.severity}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {incident.status}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(incident)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(incident.id)}
                      sx={{ mt: 1 }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default IncidentList;
