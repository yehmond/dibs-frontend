import React from "react";
import MaterialTable from "material-table";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GradeIcon from "@material-ui/icons/Grade";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            margin: "5rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingBottom: "5rem",
            alignItems: "center",
            textAlign: "center",
        },
        header: {
            paddingBottom: "3rem",
        },
    })
);

export default function PastReservations() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: "Time", field: "time" },
            { title: "Barbershop", field: "barbershop" },
            { title: "Barber Name", field: "barberName" },
        ],
        pastdata: [
            {
                time: "Tue May 15, 11:15 am",
                barbershop: "Tonys Barbershop",
                barberName: "Tony",
                barbershopID: 0,
                reservationID: 0,
            },
            {
                time: "Fri May 21, 2:00 pm",
                barbershop: "Timmys Barbershop",
                barberName: "Sam",
                barbershopID: 1,
                reservationID: 1,
            },
        ],
    });

    const history = useHistory();

    const handleRatingClick = (reservationID) => {
        history.push("/reservations/" + reservationID + "/rate");
    };

    return (
        <div className={classes.wrapper}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <div>
                <h2 className={classes.header}>Past Reservations</h2>
                <MaterialTable
                    title="Past Reservations Details"
                    columns={state.columns}
                    data={state.pastdata}
                    editable={{
                        // onRowAdd: (newData) =>
                        //     new Promise((resolve) => {
                        //         setTimeout(() => {
                        //             resolve();
                        //             setState((prevState) => {
                        //                 const data = [...prevState.passdata];
                        //                 data.push(newData);
                        //                 return { ...prevState, data };
                        //             });
                        //         }, 600);
                        //     }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.pastdata];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                    actions={[
                        {
                            icon: GradeIcon,
                            tooltip: "Rate",
                            onClick: (event, rowData) =>
                                handleRatingClick(rowData.reservationID),
                        },
                    ]}
                />
            </div>
        </div>
    );
}