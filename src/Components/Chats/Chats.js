import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatTab from '../Chats/ChatTab/ChatTab';
import styles from './Chats.module.scss';

export default function Chats(props) {
  return (
    <Container className={styles.Chats}>
      <Row>
        <Col className={styles.header}>1of 1</Col>
      </Row>
      <Row>
        <Col className={styles.tab_col}>
          <ChatTab />
        </Col>
      </Row>
    </Container>
  );
}
