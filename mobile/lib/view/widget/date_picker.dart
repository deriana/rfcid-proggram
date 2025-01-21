import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // Added to format the dates

class DateRangePickerWidget extends StatefulWidget {
  final Function(String startDate, String endDate) onDateRangeSelected;

  // Constructor with a callback to pass the selected date range back
  const DateRangePickerWidget({super.key, required this.onDateRangeSelected});

  @override
  _DateRangePickerWidgetState createState() => _DateRangePickerWidgetState();
}

class _DateRangePickerWidgetState extends State<DateRangePickerWidget> {
  DateTime? _startDate;
  DateTime? _endDate;

  // Function to show date picker and select the date
  Future<void> _selectDate(BuildContext context, bool isStartDate) async {
    DateTime initialDate = DateTime.now();
    DateTime firstDate = DateTime(2000);
    DateTime lastDate = DateTime(2100);

    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: isStartDate ? (_startDate ?? initialDate) : (_endDate ?? initialDate),
      firstDate: firstDate,
      lastDate: lastDate,
    );

    if (pickedDate != null) {
      setState(() {
        if (isStartDate) {
          _startDate = pickedDate;
        } else {
          _endDate = pickedDate;
        }
      });

      // Once the dates are selected, pass them back to the parent widget
      if (_startDate != null && _endDate != null) {
        // Use the formatted date before sending them to the parent widget
        widget.onDateRangeSelected(
          DateFormat('yyyy-MM-dd').format(_startDate!),
          DateFormat('yyyy-MM-dd').format(_endDate!),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () => _selectDate(context, true), // Set Start Date
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 12.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.calendar_today, color: Colors.black54),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _startDate != null
                          ? DateFormat('dd-MM-yyyy').format(_startDate!)
                          : 'Dari Tanggal',
                      style: TextStyle(color: Colors.black54),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: GestureDetector(
            onTap: () => _selectDate(context, false), // Set End Date
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 12.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.calendar_today, color: Colors.black54),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _endDate != null
                          ? DateFormat('dd-MM-yyyy').format(_endDate!)
                          : 'Sampai Tanggal',
                      style: TextStyle(color: Colors.black54),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
