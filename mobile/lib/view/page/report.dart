import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:mobile/api.dart'; // Import the API service
import 'package:mobile/view/widget/date_picker.dart'; // Assume updated widget
import 'package:intl/intl.dart'; // Import Intl for DateTime formatting
import 'package:mobile/view/widget/navbar.dart';
import 'package:shared_preferences/shared_preferences.dart'; // Import SharedPreferences

class Report extends StatefulWidget {
  const Report({super.key});

  @override
  _ReportState createState() => _ReportState();
}

class _ReportState extends State<Report> {
  bool isLoading = true;
  List<Map<String, dynamic>> reportData = [];
  List<Map<String, dynamic>> recapData = [];
  String startDate = "";
  String endDate = "";
  String selectedStatus = "recap"; // Default to recap
  String selectedView = "attendance";
  int userId = 0;
  bool isRecapSelected = true; // Default selected view is recap

  // Fetch report data
  Future<void> fetchReportData() async {
    if (startDate.isEmpty || endDate.isEmpty) {
      print("Please select a start and end date");
      return;
    }

    var response = await ApiService.getReportDate(userId, startDate, endDate);

    if (response['status'] == 'success') {
      setState(() {
        reportData = List<Map<String, dynamic>>.from(response['data']);
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
      print("Failed to fetch data");
    }
  }

  // Fetch recap data
  Future<void> fetchRecapData() async {
    if (startDate.isEmpty || endDate.isEmpty) {
      print("Please select a start and end date");
      return;
    }

    var response = await ApiService.getReportRecap(userId, startDate, endDate);

    if (response['status'] == 'success') {
      setState(() {
        recapData = List<Map<String, dynamic>>.from(response['data']);
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
      print("Failed to fetch recap data");
    }
  }

  String formatDate(String dateTimeStr) {
    try {
      DateTime dateTime = DateTime.parse(dateTimeStr);
      return DateFormat('dd-MM-yyyy - HH:mm').format(dateTime);
    } catch (e) {
      return dateTimeStr;
    }
  }

  List<Map<String, dynamic>> getFilteredData() {
    if (selectedStatus.isEmpty) {
      return reportData;
    }
    return reportData.where((item) {
      return item['Status']?.toLowerCase() == selectedStatus.toLowerCase();
    }).toList();
  }

  // Load userId from SharedPreferences
  Future<void> loadUserId() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      userId = prefs.getInt('userId') ?? 0;
    });
    fetchRecapData(); // Fetch recap data immediately when userId is loaded
  }

  @override
  void initState() {
    super.initState();
    loadUserId(); // Fetch userId and immediately load recap data
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color(0xFFF26A37),
                Color(0xFFF98053),
                Color(0xFFFF9B75),
              ],
              begin: Alignment.bottomLeft,
              end: Alignment.topRight,
            ),
            borderRadius: BorderRadius.only(
              bottomLeft: Radius.circular(30),
              bottomRight: Radius.circular(30),
            ),
          ),
        ),
        title: const Text(
          "Laporan Absensi",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DateRangePickerWidget(
              onDateRangeSelected: (start, end) {
                setState(() {
                  startDate = start;
                  endDate = end;
                });
                fetchReportData();
                if (isRecapSelected) {
                  fetchRecapData();
                }
              },
            ),
            const Gap(20),

            DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey.shade300, width: 1),
              ),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                child: DropdownButtonFormField<String>(
                  value: selectedStatus, // Default to "recap"
                  decoration: const InputDecoration.collapsed(hintText: null),
                  hint: const Text("Pilih Status"),
                  icon: const Icon(Icons.arrow_drop_down, color: Colors.orange),
                  items: const [
                    DropdownMenuItem(value: "", child: Text("Semua")),
                    DropdownMenuItem(value: "recap", child: Text("Recap")),
                    DropdownMenuItem(value: "masuk", child: Text("Masuk")),
                    DropdownMenuItem(value: "keluar", child: Text("Keluar")),
                    DropdownMenuItem(
                        value: "terlambat", child: Text("Terlambat")),
                    DropdownMenuItem(value: "izin", child: Text("Izin")),
                    DropdownMenuItem(value: "alfa", child: Text("Alfa")),
                  ],
                  onChanged: (value) {
                    setState(() {
                      selectedStatus = value ?? "";
                      isRecapSelected =
                          value == 'recap'; // Detect "recap" status selection
                      if (isRecapSelected) {
                        fetchRecapData();
                      } else {
                        fetchReportData();
                      }
                    });
                  },
                  style: const TextStyle(color: Colors.black, fontSize: 16),
                  dropdownColor: Colors.white,
                ),
              ),
            ),
            const Gap(20),

            // If "recap" is selected, display recap table
            isRecapSelected
                ? Container(
                    color: const Color(0xFFFF9B75),
                    padding: const EdgeInsets.symmetric(
                        vertical: 12, horizontal: 16),
                    child: Row(
                      children: const [
                        Expanded(
                            flex: 2,
                            child: Text("Nama",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 2,
                            child: Text("Hadir",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 2,
                            child: Text("Terlambat",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 2,
                            child: Text("Ijin",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 2,
                            child: Text("Alfa",
                                style: TextStyle(color: Colors.white))),
                      ],
                    ),
                  )
                : Container(
                    color: const Color(0xFFFF9B75),
                    padding: const EdgeInsets.symmetric(
                        vertical: 12, horizontal: 16),
                    child: Row(
                      children: const [
                        Expanded(
                            flex: 2,
                            child: Text("Tanggal",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 3,
                            child: Text("Nama",
                                style: TextStyle(color: Colors.white))),
                        Expanded(
                            flex: 2,
                            child: Text("Status",
                                style: TextStyle(color: Colors.white))),
                      ],
                    ),
                  ),

            // Show appropriate data table
            isLoading
                ? Center(child: CircularProgressIndicator())
                : Expanded(
                    child: ListView.builder(
                      itemCount: isRecapSelected
                          ? recapData.length // Use recap data count
                          : getFilteredData().length, // Regular report data
                      itemBuilder: (context, index) {
                        final item = isRecapSelected
                            ? recapData[index] // Recap data item
                            : getFilteredData()[index]; // Regular data item

                        return Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 12, horizontal: 16),
                          decoration: BoxDecoration(
                            border: Border(
                                bottom:
                                    BorderSide(color: Colors.grey.shade300)),
                          ),
                          child: Row(
                            children: isRecapSelected
                                ? [
                                    Expanded(
                                        flex: 2,
                                        child: Text(item['Nama'] ?? '')),
                                    Expanded(
                                        flex: 2,
                                        child: Text(item['Hadir'].toString())),
                                    Expanded(
                                        flex: 2,
                                        child:
                                            Text(item['Terlambat'].toString())),
                                    Expanded(
                                        flex: 2,
                                        child: Text(item['Ijin'].toString())),
                                    Expanded(
                                        flex: 2,
                                        child: Text(item['Alfa'].toString())),
                                  ]
                                : [
                                    Expanded(
                                        flex: 2,
                                        child: Text(
                                            formatDate(item['Tanggal'] ?? ''))),
                                    Expanded(
                                        flex: 3,
                                        child: Text(item['Nama'] ?? '')),
                                    Expanded(
                                        flex: 2,
                                        child: Text(item['Status'] ?? '')),
                                  ],
                          ),
                        );
                      },
                    ),
                  ),
          ],
        ),
      ),
      bottomNavigationBar: const Navbar(selectedIndex: 1),
    );
  }
}
