# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: proto/pose.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x10proto/pose.proto\x12\x04pose\"\x07\n\x05\x45mpty\"\x16\n\x06\x41\x63tion\x12\x0c\n\x04name\x18\x01 \x01(\t2d\n\x0c\x41\x63tionServer\x12+\n\x0c\x41\x63tionStream\x12\x0b.pose.Empty\x1a\x0c.pose.Action0\x01\x12\'\n\nSendAction\x12\x0c.pose.Action\x1a\x0b.pose.Emptyb\x06proto3')



_EMPTY = DESCRIPTOR.message_types_by_name['Empty']
_ACTION = DESCRIPTOR.message_types_by_name['Action']
Empty = _reflection.GeneratedProtocolMessageType('Empty', (_message.Message,), {
  'DESCRIPTOR' : _EMPTY,
  '__module__' : 'proto.pose_pb2'
  # @@protoc_insertion_point(class_scope:pose.Empty)
  })
_sym_db.RegisterMessage(Empty)

Action = _reflection.GeneratedProtocolMessageType('Action', (_message.Message,), {
  'DESCRIPTOR' : _ACTION,
  '__module__' : 'proto.pose_pb2'
  # @@protoc_insertion_point(class_scope:pose.Action)
  })
_sym_db.RegisterMessage(Action)

_ACTIONSERVER = DESCRIPTOR.services_by_name['ActionServer']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _EMPTY._serialized_start=26
  _EMPTY._serialized_end=33
  _ACTION._serialized_start=35
  _ACTION._serialized_end=57
  _ACTIONSERVER._serialized_start=59
  _ACTIONSERVER._serialized_end=159
# @@protoc_insertion_point(module_scope)
