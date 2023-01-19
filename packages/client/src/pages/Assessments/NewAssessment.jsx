import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const score = { v0: 0, v1: 1 };
function riskLevel(result) {
  switch (true) {
    case result >= 2 && result <= 3:
      return `Medium`;
    case result >= 4 && result <= 5:
      return `High`;
    case result >= 0 && result <= 1:
      return `Low`;
    default:
      return ``;
  }
}
export const NewAssessment = () => {
  const [ points, setPoints ] = useState(0);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  const onSubmit = async (resultvalue) => {
    const { ques1, ques2, ques3, ques4, ques5 } = resultvalue;
    const total = parseInt(ques1) +
    parseInt(ques2) +
    parseInt(ques3) +
    parseInt(ques4) +
    parseInt(ques5);
    // eslint-disable-next-line no-console
    console.log(total);
    setPoints(total);
    resultvalue.result = total;
    resultvalue.riskLevel = riskLevel(total);
    await AssessmentService.submit({ ...resultvalue, points });
  };
  const value1 = watch(`ques1`);
  const value2 = watch(`ques2`);
  const value3 = watch(`ques3`);
  const value4 = watch(`ques4`);
  const value5 = watch(`ques5`);
  useEffect(() => {
    const total = parseInt(value1) +
    parseInt(value2) +
    parseInt(value3) +
    parseInt(value4) +
    parseInt(value5);
    setPoints(isNaN(total) ? 0 : total);

  }, [ value1, value2, value3, value4, value5 ]);

  // await AssessmentService.submit(data);
  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Cat Behavioral instrument</h1>
    <h1> User Score: {points} </h1>
    <Form.Group controlId="name">
      <Form.Label>1.Cat Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter cat name"
        {...register(`name`)}
      />
    </Form.Group>
    {errors.catName && <p>Cat name is required</p>}
    <Form.Group controlId="dob">
      <Form.Label>2.Cat Date of Birth</Form.Label>
      <Form.Control type="date" {...register(`date`)} />
    </Form.Group>
    {errors.lastName && <p>Date of Birth is required</p>}
    <Form.Group controlId="ques1">
      <h2>Questions and answers</h2>
      <Form.Label>1.Previous contact with the Cat judicial System</Form.Label>
      <Form.Select {...register(`ques1`)} >
        <option value="">Choose...</option>
        <option value={score.v1}>No</option>
        <option value={score.v0}>Yes</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="ques2">
      <Form.Label>2.Physical altercations with other cats</Form.Label>
      <Form.Select {...register(`ques2`)} >
        <option value="">Choose...</option>
        <option value={score.v0}>0-3 altercations</option>
        <option value={score.v1}>3+ altercations</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="ques3">
      <Form.Label>3.Physical altercations with owner (scratching, biting, etc...)</Form.Label>
      <Form.Select {...register(`ques3`)} >
        <option value="">Choose...</option>
        <option value={score.v1}>10+ altercations</option>
        <option value={score.v0}>0-10 altercations</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="ques4">
      <Form.Label>4.Plays well with dogs</Form.Label>
      <Form.Select {...register(`ques4`)} >
        <option value="">Choose...</option>
        <option value={score.v1}>No</option>
        <option value={score.v0}>Yes</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="ques5">
      <Form.Label>5.Hisses at strangers</Form.Label>
      <Form.Select {...register(`ques5`)} >
        <option value="">Choose...</option>
        <option value={score.v1}>Yes</option>
        <option value={score.v0}>No</option>
      </Form.Select>
    </Form.Group>
    {errors.q5 && <p>please select the option below.</p>}
    <Form.Label>Risk Level: low[0-1], Medium[2-3], high[4-5]</Form.Label>
    <Form.Range />
    <Button variant="success" type="submit">Submit</Button>
  </Form>;
};
