import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, customreName, barber, service, amount) {
    return { id, date, customreName, barber, service, amount };
}

const rows = [
    createData(0, "16 Mar, 2020", "Elvis Presley", "John Doo", "Hair cut", 32.44),
    createData(
        1,
        "16 Mar, 2020",
        "Paul McCartney",
        "Kim Kin",
        "Hair cut and hair color",
        266.99
    ),
    createData(
        2,
        "16 Mar, 2020",
        "Tom Scholz",
        "Tommy Gin",
        "Nails and Shaving",
        100.81
    ),
    createData(3, "16 Mar, 2020", "Michael Jackson", "MK Dee", "Waxing", 24.39),
    createData(
        4,
        "15 Mar, 2020",
        "Bruce Springsteen",
        "Loranch K",
        "Eyebrows and Nails",
        102.79
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Reservations</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Barber</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.customreName}</TableCell>
                            <TableCell>{row.barber}</TableCell>
                            <TableCell>{row.service}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more reservations
                </Link>
            </div>
        </React.Fragment>
    );
}
