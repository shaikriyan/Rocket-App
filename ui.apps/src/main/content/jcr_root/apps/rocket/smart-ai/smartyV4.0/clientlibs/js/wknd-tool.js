$(document).ready(function () {
    // Ensure the textarea is properly initialized
    setTimeout(() => {
        $("textarea[name='./textbox']").prop("disabled", false);
    }, 500);

    $("#wkndBtn").click(function () {
        var question = $("textarea[name='./textbox']").val().trim();

        if (question === "") {
            alert("Please enter a question!");
            return;
        }


        var geminiApiUrl = `http://localhost:4000/process`;

        var requestData = {
            query: question // Changed from "contents" to "query"
        };

        // Show loading message
        $("#wkndBtn").text("Loading...").prop("disabled", true);

        $.ajax({
            url: geminiApiUrl,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
                console.log("Smarty_V2 Response:", response);

                var answer = response?.message || "No response received.";

                // Display response below the text area
                $(".answer-container").remove();
                $("<div class='answer-container'><strong>Answer:</strong> <p>" + answer + "</p></div>")
                    .insertAfter("textarea[name='./textbox']");

                // Reset button text
                $("#wkndBtn").text("Click me").prop("disabled", false);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                alert("Failed to get response from Gemini API.");
                $("#wkndBtn").text("Click me").prop("disabled", false);
            }
        });
    });
});
