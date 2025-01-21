import 'package:flutter/material.dart';
import 'package:mobile/view/page/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/api.dart'; // Ensure this import matches your API service class

class ChangePasswordModal extends StatelessWidget {
  const ChangePasswordModal({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController passwordController = TextEditingController();

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Change Password",
                  style: TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey,
                  ),
                ),
                Icon(
                  Icons.security,
                  color: Colors.orange,
                  size: 24.0,
                ),
              ],
            ),
            const SizedBox(height: 20),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: "New Password",
                hintText: "Enter new password",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),
                prefixIcon: Icon(Icons.lock, color: Colors.grey),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.grey, width: 2.0),
                  borderRadius: BorderRadius.circular(12.0),
                ),
              ),
            ),
            const SizedBox(height: 25),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).pop(); // Close the modal without any action
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[300],
                    foregroundColor: Colors.black,
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  child: Text("Cancel"),
                ),
                ElevatedButton(
                  onPressed: () async {
                    String newPassword = passwordController.text.trim();

                    if (newPassword.isEmpty) {
                      // Alert for empty password field
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Please enter a new password")),
                      );
                    } else {
                      // Fetch id from SharedPreferences (where it's stored as 'userId')
                      SharedPreferences prefs = await SharedPreferences.getInstance();
                      int? id = prefs.getInt('userId');  // Now using the correct key 'userId'

                      if (id == null) {
                        // Handle missing userId in SharedPreferences
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text("User not logged in")),
                        );
                      } else {
                        try {
                          // Call the API to update the password
                          ApiService apiService = ApiService();
                          var result = await apiService.updatePassword(id, newPassword);

                          // Checking if the API result has an error and printing it to console
                          if (result['error'] != null) {
                            print("Error: ${result['error']}"); // Print the error to console
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(result['error'])),
                            );
                          } else {
                            // On success, navigate to the login page
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(builder: (context) => LoginPage()),
                            );
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text("Password updated successfully")),
                            );
                          }
                        } catch (e) {
                          // Print the error that occurs during the update attempt
                          print("Exception during password update: $e");

                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text("Error during password update: $e")),
                          );
                        }
                      }
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    elevation: 5.0,
                  ),
                  child: Text("Save"),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
