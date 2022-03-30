# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: pose.proto

from google.protobuf import descriptor_pb2
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import reflection as _reflection
from google.protobuf import message as _message
from google.protobuf import descriptor as _descriptor
import sys
_b = sys.version_info[0] < 3 and (
    lambda x: x) or (lambda x: x.encode('latin1'))
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


DESCRIPTOR = _descriptor.FileDescriptor(
    name='pose.proto',
    package='pose',
    syntax='proto3',
    serialized_pb=_b('\n\npose.proto\x12\x04pose\"\x07\n\x05\x45mpty\"%\n\x04Action\x12\x0c\n\x04name\x18\x01 \x01(\t2Z\n\nActionServer\x12\'\n\nActionStream\x12\x0b.pose.Empty\x1a\n.pose.Action\x01\x12#\n\x08SendAction\x12\n.pose.Action\x1a\x0b.pose.Emptyb\x06proto3')
)


_EMPTY = _descriptor.Descriptor(
    name='Empty',
    full_name='pose.Empty',
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
    ],
    extensions=[
    ],
    nested_types=[],
    enum_types=[
    ],
    options=None,
    is_extendable=False,
    syntax='proto3',
    extension_ranges=[],
    oneofs=[
    ],
    serialized_start=20,
    serialized_end=27,
)


_ACTION = _descriptor.Descriptor(
    name='Action',
    full_name='pose.Action',
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name='name', full_name='pose.Action.name', index=0,
            number=1, type=9, cpp_type=9, label=1,
            has_default_value=False, default_value=_b("").decode('utf-8'),
            message_type=None, enum_type=None, containing_type=None,
            is_extension=False, extension_scope=None,
            options=None, file=DESCRIPTOR),
    ],
    extensions=[
    ],
    nested_types=[],
    enum_types=[
    ],
    options=None,
    is_extendable=False,
    syntax='proto3',
    extension_ranges=[],
    oneofs=[
    ],
    serialized_start=29,
    serialized_end=66,
)

DESCRIPTOR.message_types_by_name['Empty'] = _EMPTY
DESCRIPTOR.message_types_by_name['Action'] = _ACTION
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Empty = _reflection.GeneratedProtocolMessageType('Empty', (_message.Message,), dict(
    DESCRIPTOR=_EMPTY,
    __module__='pose_pb2'
    # @@protoc_insertion_point(class_scope:grpc.Empty)
))
_sym_db.RegisterMessage(Empty)

Action = _reflection.GeneratedProtocolMessageType('Action', (_message.Message,), dict(
    DESCRIPTOR=_ACTION,
    __module__='pose_pb2'
    # @@protoc_insertion_point(class_scope:grpc.ACTION)
))
_sym_db.RegisterMessage(Action)


_POSESERVER = _descriptor.ServiceDescriptor(
    name='ActionServer',
    full_name='pose.ActionServer',
    file=DESCRIPTOR,
    index=0,
    options=None,
    serialized_start=68,
    serialized_end=158,
    methods=[
        _descriptor.MethodDescriptor(
            name='ActionStream',
            full_name='pose.ActionServer.ActionStream',
            index=0,
            containing_service=None,
            input_type=_EMPTY,
            output_type=_ACTION,
            options=None,
        ),
        _descriptor.MethodDescriptor(
            name='SendAction',
            full_name='pose.ActionServer.SendAction',
            index=1,
            containing_service=None,
            input_type=_ACTION,
            output_type=_EMPTY,
            options=None,
        ),
    ])
_sym_db.RegisterServiceDescriptor(_POSESERVER)

DESCRIPTOR.services_by_name['ActionServer'] = _POSESERVER

# @@protoc_insertion_point(module_scope)
