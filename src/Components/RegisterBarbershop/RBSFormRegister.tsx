import {
    RenderAutocomplete,
    RenderDropzone,
    RenderSelect,
    RenderTextfield,
} from "../FormFields/FormFields";
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { ADD_BARBERSHOP_STEPS, PROVINCES, SERVICES_OFFERED } from "../../types/constants";
import "./RBS.scss";
import"../FormFields/Fields.scss";
import { Link } from "react-router-dom";
import StepperHeader from "../Stepper/StepperHeader";

class RBSFormRegister extends Component {
    render() {
        return (
            <div>
                <StepperHeader
                    currentStep={0}
                    stepLabels={ADD_BARBERSHOP_STEPS}
                />
                <div className="rbs-page-content">
                    <h1>Add Barbershop</h1>
                        <form>
                            <div className="form-fields">
                                <RenderTextfield
                                    required={true}
                                    label="Barbershop Name"
                                    placeholder="Name of Barbershop"
                                    fieldWidth="regular"
                                />
                                <RenderTextfield
                                    required={true}
                                    label="Street Address"
                                    placeholder="Street Address"
                                    fieldWidth="regular"
                                />
                                <div className="two-fields-inline">
                                    <RenderTextfield
                                        required={true}
                                        label="City"
                                        placeholder="City"
                                        fieldWidth="small"
                                    />
                                    <RenderSelect
                                        required={true}
                                        id="rbs-province-select"
                                        label="Province"
                                        placeholder="Province"
                                        fieldWidth="small"
                                        options={PROVINCES}
                                    />
                                </div>
                                <RenderAutocomplete
                                    id="services-offered"
                                    label="Services Offered"
                                    fieldWidth="regular"
                                    placeholder="Services Offered"
                                    options={SERVICES_OFFERED}
                                />
                                <RenderTextfield
                                    required={true}
                                    label="Description"
                                    placeholder="Write an enticing description"
                                    fieldWidth="regular"
                                    multiline={true}
                                />
                                <h4>Upload Some Photos</h4>
                                <div className="field-regular">
                                    <RenderDropzone/>
                                </div>
                            </div>
                            <div className="inline-buttons">
                                <div className="divider"></div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    component={Link}
                                    to={"/createshop/hours"}
                                >
                                    Next
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                </div>
            </div>
        );
    }
}

export default RBSFormRegister;
