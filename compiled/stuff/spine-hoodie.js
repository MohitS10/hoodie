// Generated by CoffeeScript 1.3.3

Spine.Model.Hoodie = {
  extended: function() {
    var type,
      _this = this;
    type = this.className.toLowerCase();
    this.attributes.unshift('type');
    this.change(function(object, event, data) {
      switch (event) {
        case 'create':
          return Spine.hoodie.store.create(type, object.toJSON());
        case 'update':
          return Spine.hoodie.store.update(type, object.id, object.toJSON());
        case 'destroy':
          return Spine.hoodie.store.destroy(type, object.id);
      }
    });
    this.fetch(function() {
      return Spine.hoodie.store.loadAll(type).done(function(records) {
        return _this.refresh(records);
      });
    });
    return Spine.hoodie.remote.on("change:" + type, function(event, remoteObject) {
      var attr, localObject, value;
      switch (event) {
        case 'create':
          return _this.refresh(remoteObject);
        case 'destroye':
          return _this.destroy(remoteObject.id);
        case 'update':
          localObject = _this.find(remoteObject.id);
          for (attr in remoteObject) {
            value = remoteObject[attr];
            localObject[attr] = value;
          }
          return localObject.save();
      }
    });
  }
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = Hoodie;
}