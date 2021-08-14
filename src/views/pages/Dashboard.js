import React, { useState, useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import TableContainer from "@material-ui/core/TableContainer";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useStateValue } from "../../utils/Utils";
// import LoanDetails from '../components/LoanDetails';
// import NoticeModal from '../components/NoticeModal';
import { formatDate } from "../../utils/Utils";
import Pagination from "components/Pagination/Pagination.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import LoanReject from '../components/LoanReject';
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [{ authenticated }, dispatch] = useStateValue(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [filedata, setFileData] = useState([]);
  const [goldpay, setGoldPay] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    "LoanRequestNum",
    "ProposedLoanAmt",
    "Created Date",
    "Select Agent",
    "Actions",
  ]);
  // const [rawData, setRawData] = useState([]);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [completeAgentList, setCompleteAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [selectedAgents, setSelectedAgents] = useState({});
  const [loanApplicationId, setLoanApplicationId] = useState("22");
  const [loanApplicationIdState, setLoanApplicationIdState] = useState("");
  const [loanApplicationIdErrorMsg] = useState([]);
  const [assigneeUserId, setAssigneeUserId] = useState("");
  const [assigneeUserIdState, setAssigneeUserIdState] = useState("");
  const [assigneeUserIdErrorMsg] = useState([]);
  const [assigneeUserMobileNumber, setAssigneeUserMobileNumber] = useState("");
  const [
    assigneeUserMobileNumberState,
    setAssigneeUserMobileNumberState,
  ] = useState("");
  const [assigneeUserMobileNumberErrorMsg] = useState([]);
  const [showLoanDetails, setShowLoanDetails] = useState(false);
  const [loanDetails, setLoanDetails] = useState({});
  const [showLoanReject, setShowLoanReject] = useState(false);
  const [loanReject, setLoanReject] = useState({});
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalErrMsg, setNoticeModalErrMsg] = useState("");
  const [noticeModalHeaderMsg, setNoticeModalHeaderMsg] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const closeNoticeModal = () => {
    setNoticeModal(false);
    setNoticeModalErrMsg("");
    setNoticeModalHeaderMsg("");
  };
  const closeLoanModal = () => {
    setShowLoanDetails(false);
    setLoanDetails({});
  };

  const closeLoansModal = () => {
    setShowLoanReject(false);
    setLoanReject({});
    GetDashboardData();
  };
  useEffect(() => {
    // GetDashboardData();
  }, []);

  const GetDashboardData = async () => {
    const header = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    const agentList = await axios("loan-service/v1/admin/user/agents", header);
    console.log(agentList.data);
    setCompleteAgentList(agentList.data);

    const result = await axios(
      "loan-service/v1/admin/loan/application/findByStatus?status=SUBMITTED",
      header
    );
    console.log(result.data);
    setRawData(result.data);
    parseIndicatorData(result.data, agentList.data);
  };
  const parseIndicatorData = (data, agentList) => {
    let reportData = [];
    data.applications.forEach((goldpay) => {
      let row = [
        getLink(goldpay.id, goldpay.loanRequestNum),
        goldpay.proposedLoanAmt,
        formatDate(goldpay.createdOn),
        createdFeildagent(goldpay.id, agentList),
        getIcons(goldpay.id),
      ];
      reportData.push(row);
    });
    let selectedList = reportData.slice(
      (selectedPageIndex - 1) * rowsPerPage,
      selectedPageIndex * rowsPerPage
    );
    setSelectedTableData(selectedList);
    setTableData(reportData);
  };
  const getLink = (loanApplicationId, link) => {
    return link !== "" ? (
      <a
        style={{ cursor: "pointer" }}
        onClick={() => onLoanDetails(loanApplicationId)}
      >
        {link}
      </a>
    ) : null;
  };
  const onLoanDetails = async (loanApplicationId) => {
    // Get Loan Application Details
    const header = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const result = await axios(
      "loan-service/v1/customer/loan/application/find?id=" + loanApplicationId,
      header
    );
    console.log(result.data);
    // Loan Details Modal
    setLoanDetails(result.data);
    setShowLoanDetails(true);
  };
  const handleChange = (event, loanApplicationId) => {
    //  setCompleteAgentList (event.target.code);
    setSelectedAgent(event.target.value);
    let updatedSelectedAgents = selectedAgents;
    updatedSelectedAgents[loanApplicationId] = event.target.value;
    setSelectedAgents(updatedSelectedAgents);
    // console.log(event.target.value);
  };

  const AssignTaskToAgent = (loanApplicationId) => {
    const selectedSclAgent = selectedAgents[loanApplicationId];
    if (!selectedSclAgent) {
      setNoticeModalErrMsg("Please select Agent first");
      setNoticeModalHeaderMsg("Error");
      setNoticeModal(true);
      return;
    }
    const data = {
      loanApplicationId: loanApplicationId,
      assigneeUserId: selectedSclAgent.id,
      assigneeUserMobileNumber: selectedSclAgent.mobileNumber,
    };
    const header = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    // this.setState({ callInProgress: true });
    axios
      .post("loan-service/v1/admin/loan/application/assign", data, header)
      .then((res) => {
        //this.setState({ callInProgress: false });
        if (res.data.errorCode && res.data.errorCode === 403) {
          setNoticeModalErrMsg(res.data.userDesc);
          setNoticeModalHeaderMsg("Error");
          setNoticeModal(true);
          return;
        } else if (res.data.errorCode) {
          setNoticeModalErrMsg(res.data.userDesc);
          setNoticeModalHeaderMsg("Error");
          setNoticeModal(true);
          return;
        } else {
          // props.history.push(`/admin/gold-rates`);
          setNoticeModalErrMsg(
            "Loan application is assigned to selected Agent"
          );
          setNoticeModalHeaderMsg("Information");
          GetDashboardData();
          setNoticeModal(true);
        }
      });
  };
  const createdFeildagent = (loanApplicationId, agentList) => {
    return (
      <>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id={loanApplicationId}
          // value={completeAgentList}
          onChange={(event) => handleChange(event, loanApplicationId)}
          displayEmpty
          className={classes.selectText}
          style={{ width: 200 }}
        >
          {agentList &&
            agentList.map((agent, index) => (
              <MenuItem key={index} value={agent}>
                {agent.name}
                {" - "}
                {agent.branchName}
              </MenuItem>
            ))}
        </Select>
      </>
    );
  };
  const getIcons = (loanApplicationId) => {
    return (
      <>
        <Button
          size="xsmall"
          color="info"
          className="bg-gradient-theme-left border-0"
          onClick={() => AssignTaskToAgent(loanApplicationId)}
        >
          Assign
        </Button>
        <Button
          size="xsmall"
          color="info"
          className="bg-gradient-theme-left border-0"
          style={{ marginLeft: 10 }}
          onClick={() => RejectTaskToAgent(loanApplicationId)}
        >
          Reject
        </Button>
      </>
    );
  };
  const RejectTaskToAgent = (loanApplicationId) => {
    setShowLoanReject(true);
    setLoanReject(loanApplicationId);
  };
  const onSearchChange = (event) => {
    const filteredData = rawData.applications.filter((row) => {
      const val = event.target.value;
      return row.loanRequestNum.toLowerCase().includes(val.toLowerCase());
    });
    parseIndicatorData(
      { count: filteredData.length, applications: filteredData },
      completeAgentList
    );
  };

  const getPageData = (event) => {
    let pageIndex = 0;
    let pageCount = Math.ceil(tableData.length / rowsPerPage);
    switch (event.target.innerText) {
      case "FIRST":
        pageIndex = 1;
        break;
      case "PREVIOUS":
        pageIndex = selectedPageIndex - 1;
        break;
      case "LAST":
        pageIndex = pageCount;
        break;
      case "NEXT":
        pageIndex = selectedPageIndex + 1;
        break;
      default:
        pageIndex = parseInt(event.target.innerText);
        break;
    }
    if (pageIndex < 1) pageIndex = 1;
    else if (pageIndex > pageCount) pageIndex = pageCount;

    let selectedList = tableData.slice(
      (pageIndex - 1) * rowsPerPage,
      pageIndex * rowsPerPage
    );
    setSelectedPageIndex(pageIndex);
    setSelectedTableData(selectedList);
  };
  const getPageDetails = () => {
    let DataCount = Math.ceil(tableData.length / rowsPerPage);
    // switch ()
    let pageArray = [];
    Array.from(new Array(DataCount)).forEach((count, index) => {
      if (index + 1 === selectedPageIndex) {
        pageArray.push({
          text: `${index + 1}`,
          active: true,
        });
      } else {
        pageArray.push({
          text: `${index + 1}`,
        });
      }
    });
    return pageArray;
  };
  return (
    <div>
      <GridContainer>
        <GridItem>
          <h3 style={{ fontWeight: 500 }}>My Dashboard</h3>
        </GridItem>
      </GridContainer>
      <hr></hr>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <label>Search</label>
                <input onChange={onSearchChange} style={{ margin: 5 }} />
              </GridItem>
            </GridContainer>
            <Table
              tableHeaderColor="warning"
              tableHead={tableColumns}
              tableData={selectedTableData}
            />
            <div style={{ textAlign: "right" }}>
              <Pagination
                pages={getPageDetails()}
                currentPage={selectedPageIndex}
                color="info"
                onClick={(event) => getPageData(event)}
              />
            </div>
          </TableContainer>
        </GridItem>
        {/* <LoanDetails
                    showModal={showLoanDetails}
                    trade={loanDetails}
                    closeModal={closeLoanModal}
                />
                <LoanReject
                    showModal={showLoanReject}
                    trade={loanReject}
                    closeModal={closeLoansModal}
                />
                <NoticeModal
                    noticeModal={noticeModal}
                    noticeModalHeader={noticeModalHeaderMsg}
                    noticeModalErrMsg={noticeModalErrMsg}
                    closeModal={closeNoticeModal}
                /> */}
      </GridContainer>
    </div>
  );
}
