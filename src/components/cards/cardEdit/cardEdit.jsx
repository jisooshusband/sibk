import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./cardEdit.module.css";

class CardEdit extends Component {
  render() {
    const { movie_id, movie_name, movie_category, movie_image } = this.props.data;
    const { handleUpdate, handleDelete, data } = this.props;

    return (
      <>
        <Card style={{ width: "200px" }} className={`${styles.customCard} mr-auto`}>
          <Card.Img
            variant="top"
            src={`http://localhost:3001/backend1/api/${movie_image}`}
            className={styles.imgCard}
          />
          <Card.Body className="text-center">
            <Card.Title className={styles.title}>{movie_name}</Card.Title>
            <Card.Text className={styles.category}>{movie_category}</Card.Text>
            <Button
              className={styles.btUpdate}
              variant="outline-primary"
              onClick={() => 
                handleUpdate(data)}
            >
              Update
            </Button>
            <Button
              className={styles.btDelete}
              variant="outline-primary"
              onClick={() => handleDelete(movie_id)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default CardEdit;