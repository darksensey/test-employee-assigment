import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Inject } from '@nestjs/common';
import { Assigment, ConnectableType } from "../enteties/assigment.entity";
import { AssigmentService } from "./assigment.service";
import { EmployeeService } from "../employee/employee.service";
import { Employee } from "../enteties/employee.entity";
import { Contractor } from "../enteties/contractor.entity";

@EventSubscriber()
export class AssigmentSubscriberService implements EntitySubscriberInterface<Assigment> {
  constructor(
    dataSource: DataSource,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(AssigmentService) private assigmentService: AssigmentService
    ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Assigment;
  }


  async beforeUpdate(event: UpdateEvent<Assigment>) {
    console.log('beforeUpdate');
    const updatedColumns = event.updatedColumns.map((column) => column.propertyName);
    console.log(updatedColumns);
    // I want to recalculate total only if months or rnDPercentage is updated
    // and ignore others field updates
    if (updatedColumns.some((column) => ['months', 'rnDPercentage'].includes(column))) {
      await this.recalculateTotalHook(event)
    }
  }

  private async recalculateTotalHook(event: InsertEvent<Assigment> | UpdateEvent<Assigment>) {
    event.entity.total = this.assigmentService.calculateTotal(event.entity as Assigment);

    if (event.entity.connectableType === ConnectableType.EMPLOYEE) {
      // recalculate employee total
      // get all employee for this assigment with all assigment related to them
      const employees = await event.manager.find(Employee, {
        relations: ['assigment'],
        where: {
          id: event.entity.connectableId,
        }
      });

      // recalculate total for all employee
      for (let employee of employees) {
        // exclude current assigment with old value (cause beforeUpdate hook) and replace it with the one which is updated
        const total = [
          ...employee?.assigment.filter(assigment => assigment.id !== event.entity.id),
          event.entity // updated value
        ].reduce((acc, assigment) => acc + assigment.total, 0);

        await event.manager.update(Employee, employee.id, { total });
      }

    } else if (event.entity.connectableType === ConnectableType.CONTRACTOR) {
      // todo recalculate contractor total
    }
  }

  async afterInsert(event: InsertEvent<Assigment>) {
    await this.recalculateTotalHook(event);
  }
}
