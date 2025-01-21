class AbsentModel {
  String? id;
  String? userId;
  String? timestamp;
  String? type;

  AbsentModel({this.id, this.userId, this.timestamp, this.type});

  AbsentModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    userId = json['userID'];
    timestamp = json['timestamp'];
    type = json['type'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['userID'] = userId;
    data['timestamp'] = timestamp;
    data['type'] = type;
    return data;
  }
}
