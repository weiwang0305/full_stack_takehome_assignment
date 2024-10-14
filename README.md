<a href="https://www.lume.ai" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/data-review-assignment/public/logo_title.png" style="max-width: 100%; width: 250px; margin-bottom: 20px">
    <img alt="OpenAI Cookbook Logo" src="/data-review-assignment/public/logo_title.png" width="250px">
  </picture>
</a>

<h3></h3>
 
---

### **Take-Home Assignment: Data Review, Editor, and Exporter**

**Objective**: Build a data review interface that queries JSON data from a Next.js API, displays the data in a table format with validation errors, and allows users to export the data in CSV format. You will also color-code validation errors and provide error details in an interactive way.

**Deliverables**:

1. **Data Query from API**: Implement a Next.js API route that returns the provided mock JSON data (attached below).
2. **Data Review Table**:
    - Display the data in a table, flattening any nested fields (e.g., `address`) into separate columns (e.g., `Street`, `City`, `Zipcode`).
    - Color-code validation errors in each column according to severity:
        - Red for critical errors (must be fixed).
        - Yellow for warnings (should be reviewed).
        - Green for valid fields.
    - **Hoverable Error Messages**: Each cell with a validation error should display the error message on hover as a tooltip.
    - **Error Summary Modal**: Include an "Error Summary" modal with a clickable button or link that opens a modal. This modal should list all the validation errors for that specific row, with details for each error.
3. **CSV Export**: Allow users to export the data to a CSV format.


**Design Considerations**:

- **No Figma Provided**: We have deliberately not provided Figma or design assets for this project. This is to give you the freedom to design the table and modals as you see fit. Part of the evaluation will be based on your ability to create a user-friendly, intuitive UI without strict design guidelines. You're free to choose the best layout, color schemes, and UX patterns, and UI Libraries that fit the task.

**Evaluation**:

Very simply, you are evaluated on the quality of the code, functionality, and design (UI/UX) of the product, which are all equally important (and hard requirements) for this role. This is deliberately open ended to give you space to show what you can do in all three pillars. We are looking for 10x engineers with a great eye for design.

**Mock Data**: You will be working with the following mock JSON data. The data will always follow a static model. Your API should serve this data to the frontend:

```json
{
  "records": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "street": "123 Main St",
      "city": "New York",
      "zipcode": "12345",
      "phone": "123-456-7890",
      "status": "active",
      "errors": {
        "phone": {
          "message": "Invalid phone format",
          "severity": "critical"
        },
        "zipcode": {
          "message": "Invalid zipcode",
          "severity": "warning"
        }
      }
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@sample",
      "street": "456 Elm St",
      "city": "Los Angeles",
      "zipcode": "",
      "phone": "987-654-3210",
      "status": "inactive",
      "errors": {
        "email": {
          "message": "Invalid email format",
          "severity": "critical"
        },
        "zipcode": {
          "message": "Zipcode is missing",
          "severity": "critical"
        }
      }
    },
    {
      "id": 3,
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "street": "",
      "city": "Chicago",
      "zipcode": "60614",
      "phone": "111-222-3333",
      "status": "pending",
      "errors": {
        "street": {
          "message": "Street address is missing",
          "severity": "warning"
        }
      }
    }
  ]
}

```

**Expectations**:

- **Tech Stack**: Use **Next.js** for API and server-side rendering, React for frontend components. Styling can be done with **Tailwind CSS** or your **UI library of choice**.
- **Time Estimation**: This assignment should take 4–6 hours to complete.
- **Submission**: Please fork this repo, and provide a GitHub repo link containing your code, with a README explaining your approach, assumptions, and any improvements you would make given more time.

