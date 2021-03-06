import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { makeStyles, Container, Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";


interface IFormInput{
    email: string;
    name: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().required().email(),
    name: yup.string().required().min(5).max(25),
    password: yup.string().required().min(8).max(20),
  });

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));


function Signup() {
    const {register, handleSubmit, formState:{errors},}= useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const { heading, submitButton } = useStyles();

    const [json, setJson] = useState<string>();

    const onSubmit = (data: IFormInput) => {
        setJson(JSON.stringify(data));
    };


    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h5">
                Sign UP Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                {...register("name")}
                    variant="outlined"
                    margin= "normal"
                    label="Name"
                    helperText={errors.name?.message}
                    error={!!errors.name?.message}
                    fullWidth
                    required
                />
                <TextField
                {...register("email")}
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                    fullWidth
                    required
                />
                <TextField
                    {...register("password")}
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    helperText={errors.password?.message}
                    error={!!errors.password?.message}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submitButton}
                >
                    Sign Up
                </Button>

                {json && (
                    <>
                        <Typography variant="body1">
                            Below is the JSON that would normally get passed to the server
                            when a form gets submitted
                        </Typography>
                        <Typography variant="body2">{json}</Typography>
                    </>
                )}
            </form>
        </Container>
    );
}

export default Signup;