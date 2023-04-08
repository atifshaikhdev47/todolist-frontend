import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CardContent, TextField, Grid, Card } from "@mui/material";

const User = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/");
    setData(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && mobile !== "") {
      const payload = {
        name: name.trim(" "),
        email: email.trim(" "),
        mobile: mobile,
      };
      const result = await axios.post("http://localhost:8000/user", payload);
      setName("");
      setEmail("");
      setMobile(0);
      getData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && mobile !== "") {
      const payload = {
        name: name.trim(" "),
        email: email.trim(" "),
        mobile: mobile,
      };
      const result = await axios.patch(
        `http://localhost:8000/${id}/update`,
        payload
      );
      setName("");
      setEmail("");
      setMobile(0);
      setId("");
      setUpdate(false);
      getData();
    }
  };

  const handleDelete = async (item) => {
    console.log(item);
    const result = await axios.delete(
      `http://localhost:8000/${item._id}/delete`
    );
    console.log(result.data);
    getData();
  };

  const handleEdit = (item, index) => {
    setName(item.name);
    setEmail(item.email);
    setMobile(item.mobile);
    console.log(item);
    setUpdate(true);
    setId(item._id);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            variant="standard"
            value={name}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            variant="standard"
            value={email}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder="mobile"
            variant="standard"
            value={mobile}
            type="number"
            fullWidth
            onChange={(e) => setMobile(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          {update ? (
            <Button variant="contained" onClick={handleUpdate}>
              update
            </Button>
          ) : (
            <Button variant="contained" onClick={handleAdd}>
              add
            </Button>
          )}
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      <Grid container spacing={2}>
        {data.length > 0 &&
          data.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card>
                <CardContent sx={{ bgcolor: "lightBlue" }} key={index}>
                  <p>{item.id}</p>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.mobile}</p>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(item)}
                  >
                    delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(item, index)}
                  >
                    edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default User;
