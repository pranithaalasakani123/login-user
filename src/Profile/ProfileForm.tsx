import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import classes from './ProfileForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Image, Button, Alert } from 'react-bootstrap';




interface uservalues {
  userValues: any;
}

const ProfileForm: React.FC<uservalues> = ({ userValues }) => {

  const [edit] = useState(userValues);
  const [updated, setUpdated] = useState(false);


  let validationSchema = yup.object().shape({
    displayName: yup.string().min(3).required('display name is required'),
    firstName: yup.string().min(3).required('firstName name is required'),
    lastName: yup.string().min(3).required('lastName name is required'),
    zipCode: yup.string().nullable(),
    password: yup.string().required().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
    PhoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Add  a 10 digit number "
      ),
  });


  return (

    <div >
      <h1 className={classes.imgchange}>Your User Profile</h1>
      <div >
        <Container>
          <Row>
            <Col>
              <Image className={classes.img} src={edit.profilePic} />
            </Col>
            <Col xs={8}>
              <Formik
                initialValues={{
                  displayName: edit.displayName,
                  firstName: edit.firstName,
                  lastName: edit.lastName,
                  PhoneNumber: edit.phoneNumber,
                  password: edit.password,
                  zipCode: edit.zipCode
                }}
                validationSchema={validationSchema}
                onSubmit={
                  (values, { setSubmitting }) => {
                    setSubmitting(true);

                    setUpdated(true);

                    setTimeout(() => {
                      setUpdated(false);
                    }, 2000);

                    fetch('https://anisoft.us/chatapp/api/user/updateuser', {
                      method: 'POST',
                      body: JSON.stringify({
                        password: values.password,
                        displayName: values.displayName,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        zipCode: values.zipCode,
                        phoneNumber: values.PhoneNumber
                      }),
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      }
                    }).then((res) => { return res.json() })
                      .then((data) => {
                        console.log(data);
                      })
                  }
                }
                validate={() => ({})}
              >

                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form className={classes.fo} onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label column sm="3">
                        User Name
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control plaintext readOnly defaultValue={userValues.username} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        Display Name
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="text"
                          name='displayName'
                          defaultValue={userValues.username}
                          value={values.displayName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.displayName && !!errors.displayName}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.displayName}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        Password
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name='password'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.password}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3" className={classes.label}>
                        First Name
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="text"
                          placeholder="First-name"
                          name='firstName'
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        Last Name
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="text"
                          placeholder="Last-name"
                          name='lastName'
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        zip Code
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="text"
                          placeholder="Zip code"
                          name='zipCode'
                          value={values.zipCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.zipCode && !!errors.zipCode}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.zipCode}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        Phone Number
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          type="text"
                          placeholder="ph-no"
                          name='PhoneNumber'
                          value={values.PhoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.PhoneNumber && !!errors.PhoneNumber}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.PhoneNumber}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <div className={classes.button}>
                      <Button type='submit' className={classes.imgchange} disabled={!isValid}>submit</Button>
                    </div>
                    <div className={classes.alert}>
                      {" "}
                      {updated ? (
                        <Alert variant="success">user details updated!!</Alert>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form>
                )
                }
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProfileForm;