import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  Future<Map<String, dynamic>> loginUser(
      String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/user/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'username': username, 'password': password}),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else if (response.statusCode == 400 || response.statusCode == 401) {
        return {'error': json.decode(response.body)['message']};
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      print('Error during login: $e');
      return {'error': 'Network error'};
    }
  }

  Future<Map<String, dynamic>> updatePassword(
      int id, String newPassword) async {
    try {
      final response = await http.put(
        Uri.parse(
            '$baseUrl/user/password/$id'), // PUT request for updating password
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(
            {'password': newPassword}), // Sending new password in the body
      );

      if (response.statusCode == 200) {
        return json.decode(response.body); // Successfully updated password
      } else if (response.statusCode == 400 || response.statusCode == 404) {
        return {'error': json.decode(response.body)['message']};
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      print('Error during password update: $e');
      return {'error': 'Network error'};
    }
  }

  static Future<Map<String, dynamic>> getAbsent(int id) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/mobile/$id'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else if (response.statusCode == 404) {
        return {'error': json.decode(response.body)['message']};
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      return {'error': 'Network error'};
    }
  }

  Future<Map<String, dynamic>> postCountByType(int id, String type) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/mobile/count/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'type': type}),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      return {'error': 'Network error'};
    }
  }

  static Future<Map<String, dynamic>> getReportDate(
      int id, String startDate, String endDate) async {
    try {
      final response = await http.get(
        Uri.parse(
            '$baseUrl/mobile/report/$id?startDate=$startDate&endDate=$endDate'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else if (response.statusCode == 404) {
        return {'error': json.decode(response.body)['message']};
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      print('Error during fetching report by ID: $e');
      return {'error': 'Network error'};
    }
  }

  static Future<Map<String, dynamic>> getReportRecap(
      int id, String startDate, String endDate) async {
    try {
      final response = await http.get(
        Uri.parse(
            '$baseUrl/mobile/recap/$id?startDate=$startDate&endDate=$endDate'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else if (response.statusCode == 404) {
        return {'error': json.decode(response.body)['message']};
      } else {
        return {'error': 'Something went wrong, please try again later'};
      }
    } catch (e) {
      return {'error': 'Network error'};
    }
  }
}
