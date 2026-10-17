export const PILLAR_TICKETS = [
  {
    id: "APR-2298", title: "Sign off quotation Q-2298", category: "Sales · Approval", status: "Approval", tone: "blue", owner: "SK", team: "Sekar", due: "28 Sep · 2:00 PM", priority: "Normal", sla: "Due today",
    start: "28 Sep · 9:00 AM",
    description: "Approve revision 02 for 24,000 units before the order is released to planning. Commercial terms and the delivery window are attached.",
    checks: ["Price and tax reviewed", "Delivery date confirmed"], attachment: "Quotation_Q-2298_R02.pdf",
    conversation: [
      { name: "Anita", time: "11:12", text: "Updated the delivery split to two lots. The customer has confirmed the revised schedule." },
      { name: "Sekar", time: "11:24", text: "Pricing is within the agreed band. Checking the payment terms before I sign." },
    ],
  },
  {
    id: "QC-1186", title: "Collect retention sample", category: "B-2281 · Quality", status: "Scheduled", tone: "violet", owner: "ML", team: "Meera", due: "28 Sep · 3:30 PM", priority: "Normal", sla: "45m left",
    start: "28 Sep · 1:00 PM",
    description: "Collect the retention sample from packaging line 02. Record the quantity, container seal and storage location against batch B-2281.",
    checks: ["Sample labels issued", "Retention cabinet allocated"], attachment: "Sampling_plan_B-2281.pdf",
    conversation: [
      { name: "Ravi", time: "13:45", text: "The final packing run is ready. Samples can be collected at the line clearance desk." },
      { name: "Meera", time: "13:52", text: "Labels are printed. I’ll record the seal number and cabinet location at collection." },
    ],
  },
  {
    id: "MNT-0842", title: "Calibrate press TP-04", category: "Equipment · Facility", status: "4h overdue", tone: "amber", owner: "AK", team: "Arun", due: "28 Sep · 9:00 AM", priority: "High", sla: "SLA breached",
    start: "27 Sep · 10:00 AM",
    description: "Calibration is overdue for tablet press TP-04. Keep the equipment unavailable until the new certificate has been reviewed and approved.",
    checks: ["Equipment placed on hold", "Supervisor notified"], attachment: "TP-04_calibration_request.pdf",
    conversation: [
      { name: "Arun", time: "09:18", text: "The service engineer is on site. The press remains locked out of production." },
      { name: "Priya", time: "10:06", text: "Attach the traceable reference results. QA will review the certificate before release." },
    ],
  },
  {
    id: "INV-1042", title: "Material retest due tomorrow", category: "RM-1042 · Inventory", status: "Alert", tone: "amber", owner: "DV", team: "Divya", due: "29 Sep · 10:00 AM", priority: "High", sla: "Retest due",
    start: "28 Sep · 10:00 AM",
    description: "Lactose monohydrate lot RM-1042 reaches its retest date tomorrow. Reserve a QC sample and review the remaining 125 kg before further dispensing.",
    checks: ["Retest request sent to QC", "Lot located · WH-01 / A-04"], attachment: "RM-1042_supplier_CoA.pdf",
    conversation: [
      { name: "Divya", time: "10:14", text: "125 kg remains in bin A-04. I’ve flagged the lot so tomorrow’s dispensing plan can be reviewed." },
      { name: "Meera", time: "10:26", text: "QC sampling is booked for 09:00. We’ll attach the results here for the release decision." },
    ],
  },
  {
    id: "CAPA-0431", title: "Verify corrective action", category: "CAPA · Effectiveness review", status: "Complete", tone: "green", owner: "PR", team: "Priya", due: "27 Sep · 4:15 PM", priority: "Normal", sla: "Closed on time",
    start: "24 Sep · 9:00 AM",
    description: "Verify the revised calibration reminder and escalation workflow. Review evidence from the next three scheduled equipment checks before closing the action.",
    checks: ["Three follow-up checks reviewed", "Effectiveness approved by QA"], attachment: "CAPA-0431_effectiveness.pdf",
    conversation: [
      { name: "Arun", time: "14:10", text: "All three checks completed before their due dates. Named owners received the reminders." },
      { name: "Priya", time: "16:15", text: "Evidence reviewed and the action is effective. Signed closure is attached to the CAPA record." },
    ],
  },
  {
    id: "QA-2281", title: "Review batch B-2281", category: "Production → Quality", status: "Conversation", tone: "blue", owner: "QA", team: "Quality team", due: "28 Sep · 4:00 PM", priority: "High", sla: "2h left",
    start: "28 Sep · 1:30 PM",
    description: "Review the completed batch record before release. Reconcile material usage, in-process results and operator signatures against the approved master record.",
    checks: ["Batch record and IPC results attached", "Material reconciliation complete"], attachment: "B-2281_batch_review_pack.pdf",
    conversation: [
      { name: "Priya", time: "13:42", text: "Batch records, yield reconciliation and IPC results are attached. The packaging count matches the final output. Ready for QA." },
      { name: "Meera", time: "13:48", text: "Reviewing the final checks now. I’ll verify the line clearance and signature sequence before recommending release." },
    ],
  },
];
